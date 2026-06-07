import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import unicorn from "eslint-plugin-unicorn";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRootDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
const eslintConfiguration = [
    // 0. Archivos ignorados globales
    {
        ignores: [
            "node_modules",
            "dist",
            "build",
            ".agents",
            "artifacts",
            "update-imports.js",
            "auto-fix.js",
            "apps/**/dist",
            "**/vite.config.ts",
            "**/*.config.ts",
            "**/*.config.js",
            "**/*.config.mjs",
            // ¡Excluimos por completo la UI de v0 y plantillas!
            "apps/**/src/core/components/ui/**/*",
            "apps/**/src/core/components/admin-desk/sidebar/**/*",
        ],
    },

    // 1. Configuraciones base (JS, TS, Prettier, Unicorn)
    js.configs.recommended,
    ...tseslint.configs.recommended,
    unicorn.configs["flat/recommended"],
    eslintPluginPrettier,

    // 2. REGLAS PARA EL CORE (Lógica de Negocio / Dominio)
    {
        files: ["packages/**/*.{ts,tsx}"],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                project: ["./packages/*/tsconfig.json"],
                tsconfigRootDir: projectRootDirectory,
            },
        },
        rules: {
            // Previene que la capa de dominio acceda a la UI del navegador
            "no-restricted-globals": [
                "error",
                { name: "window", message: "Domain layer cannot access the browser window object." },
                { name: "document", message: "Domain layer cannot access the DOM." },
            ],
        },
    },

    // 3. REGLAS PARA APLICACIONES REACT (UI / Vite)
    {
        files: ["apps/**/*.{ts,tsx}"],
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ["./apps/*/tsconfig.app.json", "./apps/*/tsconfig.node.json", "./apps/*/tsconfig.json"],
                tsconfigRootDir: projectRootDirectory,
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },

    // 4. REGLAS GLOBALES K&R Y ESTILO (Aplicables en el proyecto)
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            "prettier/prettier": "error",
            "no-console": ["error", { allow: ["warn", "error"] }],
            "no-underscore-dangle": "off",
            "no-useless-catch": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "import", next: "*" },
                { blankLine: "any", prev: "import", next: "import" },
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase", "PascalCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "variable",
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: ["class", "interface", "typeAlias", "enum"],
                    format: ["PascalCase"],
                },
                {
                    selector: ["objectLiteralProperty", "typeProperty", "property", "objectLiteralMethod"],
                    filter: { regex: "[- ]|^__html$|^[0-9]+$|^@", match: true },
                    format: null,
                },
                {
                    selector: ["objectLiteralProperty", "typeProperty", "property"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "parameter",
                    format: ["camelCase", "PascalCase"],
                    leadingUnderscore: "allow",
                },
            ],
            // Apagamos reglas molestas de Unicorn para priorizar tu arquitectura
            "unicorn/prevent-abbreviations": [
                "error",
                {
                    checkProperties: true,
                    checkVariables: true,
                    replacements: {
                        req: false,
                        res: false,
                        err: false,
                        env: false,
                        envs: false,
                        dto: false,
                        props: false,
                        args: false,
                        ref: false,
                        e: false,
                        utils: false,
                        fn: false,
                        prev: false,
                    },
                },
            ],
            "unicorn/filename-case": "off",
            "unicorn/no-null": "off",
            "unicorn/prefer-number-properties": "off",
            "unicorn/prefer-math-trunc": "off",
            "unicorn/prefer-logical-operator-over-ternary": "off",
            "unicorn/consistent-function-scoping": "off",
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },

    // 5. EXCEPCIONES PARA CLEAN ARCHITECTURE (DTOs, Mappers, etc.)
    {
        files: [
            "**/*.dto.ts",
            "**/*.mapper.ts",
            "**/*.mappers.ts",
            "**/*.datasource.ts",
            "**/*.datasource.impl.ts",
            "**/*.datasources.ts",
            "**/*.schema.ts",
            "**/*.schemas.ts",
        ],
        rules: {
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase", "snake_case"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: ["class", "interface", "typeAlias", "enum", "typeParameter"],
                    format: ["PascalCase"],
                },
                {
                    selector: "property",
                    format: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "parameter",
                    format: ["camelCase", "snake_case"],
                    leadingUnderscore: "allow",
                },
            ],
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
    // 6. EXCEPCIONES PARA PLANTILLAS Y COMPONENTES UI DE TERCEROS
    {
        files: ["apps/**/src/core/components/ui/**/*.{ts,tsx}", "apps/**/src/core/components/admin-desk/sidebar/**/*.{ts,tsx}"],
        rules: {
            // Permitimos cualquier formato de variables y funciones en las plantillas
            "@typescript-eslint/naming-convention": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "warn",

            // Apagamos reglas estrictas de React y Unicorn que rompen plantillas comunes
            "react-hooks/set-state-in-effect": "off",
            "unicorn/no-document-cookie": "off",
            "padding-line-between-statements": "off",
        },
    },
];

export default eslintConfiguration;

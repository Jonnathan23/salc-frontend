---
trigger: always_on
---

## 1. Naming Conventions & K&R Style

- **General Style:** Follow the Kernighan and Ritchie (K&R) style. Write all code (variables, functions, classes) in English. Do not expand standard abbreviations (e.g., `req`, `res`, `err`, `env`, `dto`, `props`, `args` are fully allowed).
- **Default Naming:**
    - `camelCase` for functions, methods, and instances.
    - `PascalCase` for classes, types, interfaces, and enums.
    - `UPPER_CASE` is allowed for constant variables.
- **Clean Architecture Exceptions:** When working with specific files (`*.dto.ts`, `*.mapper.ts`, `*.datasource.ts`, `*.datasource.impl.ts`, `*.schema.ts`), `snake_case` is explicitly allowed for properties, variables, and parameters to match database or external API contracts.
- **UI & 3rd-Party Exceptions:** Naming conventions are completely relaxed inside `apps/**/src/core/components/ui/**` and `admin-desk/sidebar/**` to accommodate third-party library requirements.

## 2. Type Safety & 'any' Restrictions

- **No 'any' Rule:** You are STRICTLY FORBIDDEN from using the `any` type in core application logic. If a type cannot be determined ahead of time, you MUST use `unknown` and properly narrow it down.
- **Exceptions:** The `any` type is only tolerated by the linter in Clean Architecture boundary files (DTOs, mappers, datasources, schemas) and UI templates/components.
- **String Literal Types:** Do not use generic `string` types for properties or variables that only accept a specific set of allowed values. Enforce strict typing via unions (e.g., `type Status = "Active" | "Blocked";`).

## 3. Domain Layer Isolation

- **No Browser Globals in Core:** When modifying files inside the `packages/**` directory (Business Logic / Domain), you are **STRICTLY FORBIDDEN** from accessing browser-specific globals such as `window` or `document`.

## 4. Spacing, Padding, and Console Rules

- **Console Outputs:** Do NOT use `console.log()`. You may only use `console.warn()` and `console.error()`.
- **Line Padding:** You must format the code with specific blank lines to ensure readability:
    - Always leave a blank line AFTER `import` statements.
    - Always leave a blank line BEFORE a `return` statement.
    - Always leave a blank line BEFORE AND AFTER variable declarations (`const`, `let`, `var`), except when declaring multiple variables in a row.

## 5. Preservation & Comments

- **Preserve Existing Code:** If you are modifying existing files, do NOT change the names of existing variables, functions, or classes unless explicitly instructed to do so by the user.
- **Comments:** Code comments and explanations may be written in either Spanish or English.

---

## Code Formatting Examples

### General Spacing & Naming (Apps/Core)

```typescript
import { useState } from "react";
import { useAuth } from "./useAuth.hook";

// Blank line required after imports

export const processUser = () => {
    const [isActive, setIsActive] = useState(false);
    const auth = useAuth();

    // Blank line required after variable declarations

    if (!auth) {
        console.error("Auth missing"); // Only warn/error allowed
    }

    // Blank line required before return
    return isActive;
};
```

# Clean Architecture Exceptions (DTOs/Mappers)

```TypeScript
// Allowed snake_case in DTOs and Mappers
export interface UserResponseDto {
  first_name: string;
  last_name: string;
  created_at: string;
}
```

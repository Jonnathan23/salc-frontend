import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@salc/core": fileURLToPath(new URL("../../packages/core/src", import.meta.url)),
            "@salc/ui": fileURLToPath(new URL("../../packages/ui", import.meta.url)),
            "@salc/ui/*": fileURLToPath(new URL("../../packages/ui/*", import.meta.url)),
        },
    },
});

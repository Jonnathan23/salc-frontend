---
trigger: manual
---

**Strict Absolute Imports:** You are STRICTLY FORBIDDEN from using relative import paths:
   - **UI Apps (`apps/`):** When working inside a specific frontend application (like AdminDesk) and importing local components, hooks, or presentation interfaces, you must use the `@/` prefix. 
     *(Example: `import type { BaseUserFormValues } from "@/features/indentity/presentation/interfaces";`)*
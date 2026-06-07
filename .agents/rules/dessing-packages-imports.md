---
trigger: manual
---

**Strict Absolute Imports:** You are STRICTLY FORBIDDEN from using relative import paths:
   - **Core Package (`packages/core/`):** Whenever you need to import anything from the business logic, domain, or infrastructure layers, you must use the `@salc/core/` prefix. 
     *(Example: `import { type StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";`)*
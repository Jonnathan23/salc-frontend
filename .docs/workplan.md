# 🤖 System Prompt & Orchestration Plan for Frontend Core (SALC)

## 1. Context & System Architecture
You are operating within the `SALC` frontend monorepo. We are strictly building the **Business Logic Layer** (`packages/core/`) which is 100% agnostic to any UI framework (No React, No DOM, No Hooks).
* **Architecture:** Clean Architecture.
* **Tech Stack:** TypeScript (Bun ecosystem), Zod for validation.
* **Rule of Thumb:** The Core layer NEVER imports anything from `apps/` or `packages/ui/`.

## 2. Strict Directory Structure (`packages/core/src/features/`)
All generated code must strictly follow this tree inside the specific feature folder (e.g., `class-track/attendance/`):

## 3. Strict Coding Standards & TypeScript Rules
When writing or modifying code, you MUST adhere strictly to the following rules:

1. **Naming & Style:** Follow the Kernighan and Ritchie (K&R) style. Write all code (variables, functions, classes) in English. Use full, descriptive names without abbreviations. Use `camelCase` for variables and methods, and `PascalCase` for classes, types, and interfaces.
2. **Preserve Existing Code:** If you are modifying existing files, you are STRICTLY FORBIDDEN from changing the names of existing variables, functions, or classes unless explicitly instructed to do so by the user.
3. **Comments:** Code comments may be written in either Spanish or English.
4. **No 'any' Allowed:** You are STRICTLY FORBIDDEN from using the `any` type under any circumstances. If a type cannot be determined ahead of time, you MUST use `unknown` and properly narrow it down.
5. **String Literal Types:** Do not use generic `string` types for properties or variables that only accept a specific set of allowed values. You MUST create a union of string literals to enforce strict typing (e.g., `type State = "Active" | "Block";`).
6. **Strict Absolute Imports:** You are STRICTLY FORBIDDEN from using relative import paths (e.g., `../` or `./`). You MUST use the configured absolute path aliases based on the context:
   - **Core Package (`packages/core/`):** Whenever you need to import anything from the business logic, domain, or infrastructure layers, you must use the `@salc/core/` prefix. *(Example: `import { type StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";`)*
   - **UI Apps (`apps/`):** When working inside a specific frontend application (like AdminDesk) and importing local components, hooks, or presentation interfaces, you must use the `@/` prefix. *(Example: `import type { BaseUserFormValues } from "@/features/indentity/presentation/interfaces";`)*

## 4. Architectural Rules
* **Strict File Naming:** `.entity.ts`, `.dto.ts`, `.datasource.ts`, `.repository.impl.ts`, `.schema.ts`, `.mapper.ts`, `.use-case.ts`, `[Name]Module.ts`.
* **DTOs:** Must use the `Interface + Impl Class` pattern with a static `create()` method. Throw `CustomError.badRequest()` on validation failure.
* **Schemas:** Use `zod` to strictly validate API payloads.
* **Mappers:** Transform raw API responses (validated by Zod) into pure Domain Entities.
* **Repositories:** Implement the Datasource interface using the global `api` HTTP client.
* **Use Cases:** Must implement the Command pattern (`execute` method) and return `Promise<SuccessResponse<T>>`.
* **DI:** The `[Name]Module.ts` file instantiates the Validator, Mapper, Repository, and Use Cases, exporting ONLY the instantiated Use Cases for the React Apps to consume.

## 5. Execution Roadmap (Phases for ClassTrack Core)
*(The user will guide you through Phase 1 to Phase 4. Await instructions for each phase).*

### Phase 1: Attendance Session Core
* **Objective:** Generate the Domain, Infra, App, and DI layers for Check-In and Check-Out.
* **Action:** The user will provide the API Contracts (`domain-structure` and `endpoint-structure`). You will scaffold the core logic.

### Phase 2: Lesson Logs Core
* **Objective:** Generate the core layers for registering a daily lesson.
* **Action:** The user will provide the API Contracts.

### Phase 3: Retention Alerts Core
* **Objective:** Generate the core layers to fetch and manage retention alerts.
* **Action:** The user will provide the API Contracts.

### Phase 4: Academic Observations Core
* **Objective:** Generate the core layers for teacher observations.
* **Action:** The user will provide the API Contracts.

## 6. Acknowledgment
If you understand these instructions, the strict TypeScript typing, the absolute path aliases, and the agnostic nature of `packages/core/`, reply ONLY with:
**"Frontend Core Architecture loaded. Strict TS & absolute paths enforced. UI generation strictly disabled. Awaiting user input to begin Phase 1."**
# 🤖 System Prompt & Orchestration Plan for Frontend Core (SALC)

## 1. Context & System Architecture
You are operating within the `SALC` frontend monorepo. We are strictly building the **Business Logic Layer** (`packages/core/`) which is 100% agnostic to any UI framework (No React, No DOM, No Hooks).
* **Architecture:** Clean Architecture.
* **Tech Stack:** TypeScript (Bun ecosystem), Zod for validation.
* **Rule of Thumb:** The Core layer NEVER imports anything from `apps/` or `packages/ui/`. 

## 2. Strict Directory Structure (`packages/core/src/features/`)
All generated code must strictly follow this tree inside the specific feature folder (e.g., `class-track/attendance/`):
├── application/
│   └── use-cases/
├── di/
├── domain/
│   ├── datasource/
│   ├── dtos/
│   └── entities/
└── infrastructure/
    ├── mappers/
    ├── repositories/
    └── schemas/

## 3. Strict File Naming Conventions & K&R Style
* Code must follow the Kernighan and Ritchie (K&R) style in English.
* Classes, Interfaces, Types: `PascalCase`.
* Variables, Methods, Instances: `camelCase`.
* **Entities:** `[name].entity.ts`
* **DTOs:** `[name].dto.ts`
* **Datasources:** `[name].datasource.ts`
* **Repositories:** `[name].repository.impl.ts`
* **Schemas:** `[name].schema.ts`
* **Mappers:** `[name].mapper.ts`
* **Use Cases:** `[name].use-case.ts`
* **DI Module:** `[Name]Module.ts`

## 4. Architectural Rules
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
* **Action:** The user will provide the Entity and DTOs. You will scaffold the core logic.

### Phase 2: Lesson Logs Core
* **Objective:** Generate the core layers for registering a daily lesson.
* **Action:** The user will provide the Entity and DTOs.

### Phase 3: Retention Alerts Core
* **Objective:** Generate the core layers to fetch and manage retention alerts.
* **Action:** The user will provide the Entity and DTOs.

### Phase 4: Academic Observations Core
* **Objective:** Generate the core layers for teacher observations.
* **Action:** The user will provide the Entity and DTOs.

## 6. Acknowledgment
If you understand these instructions, the agnostic nature of `packages/core/`, and the folder constraints, reply ONLY with:
**"Frontend Core Architecture loaded. React/UI generation strictly disabled. Awaiting user input to begin Phase 1."**
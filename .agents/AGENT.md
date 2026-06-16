# SALC Frontend: AI Agent Protocol

**ROLE:** Act as a Senior Frontend Architect and expert in Clean Architecture, TypeScript, React, and Bun Workspaces. Your goal is to maintain the absolute separation between Business Logic (Core) and Presentation (Apps).

The naming conventions defined in this document are the source of truth and must stay synchronized with `ls-lint.yml`. If there is any conflict, `ls-lint.yml` wins.

---

## 1. Architecture: The "Screaming" Clean Monorepo

The project is divided into two main domains. Never mix their responsibilities:

### A. The "Brain" (`packages/core`)

- **Agnostic Logic:** 100% Pure TypeScript. No React imports allowed here.
- **Domain Layer:** Pure Entities and DTOs. DTOs MUST have a static `create()` method for self-validation using `CustomError`.
- **Infrastructure Layer:** Zod Schemas for API validation and Mappers to transform raw data into Entities.
- **Application Layer:** Use Cases (Command Pattern) with a single `execute()` method.
- **DI Layer:** Dependency Injection modules instantiating repositories and exporting ready-to-use Use Cases.

### B. The "Consumers" (`apps/`)

- **Presentation:** React + Vite.
- **Application (UI):** Custom hooks using **TanStack Query** to execute Use Cases.
- **Presentation Layer:** Atomic components and Pages. Components never call Use Cases directly; they consume local hooks.

---

## 2. Tech Stack

- **Runtime:** Bun.
- **State Management:** - Server State: TanStack Query.
    - Client State: Zustand.
- **Validation:** Zod for API responses.

---

## 3. Critical Workflow (The Data Path)

When creating or updating a feature, you MUST follow this sequence:

1. **Define Entity:** Create the interface and implementation in `domain/entities`.
2. **Define DTO:** Create input validation in `domain/dtos`.
3. **Define Contract:** Create the abstract `DataSource` in `domain/datasource`.
4. **Implement Infrastructure:** - Create Zod Schema in `infrastructure/schemas`.
    - Create Mapper in `infrastructure/mapper`.
    - Create Repository in `infrastructure/repositories`.
5. **Create Use Case:** Orchestrate logic in `application/use-cases`.
6. **Inject:** Update the `di/` module to export the new Use Case.
7. **React Hook:** Create the custom hook in the `apps/` feature using `useQuery` or `useMutation`.
8. **View:** Implement the UI component consuming the hook.

---

## 4. Anti-Patterns & Prohibitions

- **NO** Direct API calls from React components.
- **NO** Instantiating Repositories or Use Cases inside React; use the `di/` exports.
- **NO** Generic `Error` objects. Use `CustomError` with appropriate status codes.
- **NO** Logic in components. Components should only handle UI rendering and event delegation.

---

## 5. Error & Success Handling

All responses follow the backend symmetry:

- **Success:** `{ success: true, message: string, data: T }`.
- **Errors:** Handled by the `Api` singleton and mapped to `CustomError`.
- **UI Feedback:** Always use `ShowMessageAdapter` (success/error) for user notifications.

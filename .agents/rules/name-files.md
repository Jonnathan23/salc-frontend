---
trigger: always_on
---

## Directory Rules

- **All directories** inside the `src` folders of `apps` and `packages` (`{apps,packages}/**/src/**`) must use **`kebab-case`**.
    - Correct: `user-profile`, `auth-module`, `shared-components`
    - Incorrect: `UserProfile`, `authModule`, `user_profile`

## File Rules by Layer & Type

### 1. General Files

- Standard `.ts` files: `camelCase` or `PascalCase`.
- Standard `.tsx` files: `PascalCase`.

### 2. Frontend (React / TanStack)

- **Hooks (`.hook.ts`)**: `camelCase` (e.g., `useAuth.hook.ts`)
- **Pages (`.page.tsx`)**: `PascalCase` (e.g., `Dashboard.page.tsx`)
- **Layouts (`.layout.tsx`)**: `PascalCase` (e.g., `Main.layout.tsx`)
- **Adapters (`.adapter.ts`)**: `PascalCase` (e.g., `User.adapter.ts`)
- **Schemas (`.schema.ts`)**: `PascalCase` (e.g., `Validation.schema.ts`)

### 3. Clean Architecture: Domain Layer

- **DTOs (`.dto.ts`)**: `PascalCase` (e.g., `CreateUser.dto.ts`)
- **Models (`.model.ts`)**: `PascalCase` (e.g., `User.model.ts`)
- **Projections (`.projection.ts`)**: `PascalCase` (e.g., `UserSummary.projection.ts`)
- **Interfaces (`.interface.ts`)**: `PascalCase` (e.g., `UserRepository.interface.ts`)
- **Datasources (`.datasource.ts`)**: `camelCase` (e.g., `user.datasource.ts`)
- **Repositories (`.repository.ts`)**: `camelCase` (e.g., `user.repository.ts`)

### 4. Clean Architecture: Infrastructure Layer

- **Datasource Implementations (`.datasource.impl.ts`)**: `camelCase` (e.g., `user.datasource.impl.ts`)
- **Mappers (`.mapper.ts`)**: `camelCase` (e.g., `user.mapper.ts`)

### 5. Clean Architecture: Application Layer

- **Use Cases (`.use-case.ts`)**: `camelCase` (e.g., `createUser.use-case.ts`)

### 6. Clean Architecture: Presentation Layer

- **Controllers (`.controller.ts`)**: `PascalCase` (e.g., `Auth.controller.ts`)
- **Workers (`.worker.ts`)**: `PascalCase` (e.g., `Background.worker.ts`)

## Ignored Paths

Do NOT apply these rules to any files or folders matching the following:
`node_modules`, `.git`, `dist`, `build`, `docs`, `.vscode`, `scripts`, `.agents`, `__test__`, `__tests__`, `.env.*`, `vite.config.ts`, `*.json`, `.wakatime-project`, or any path containing `**/routes/**`.

---

## Example File Tree

When scaffolding features, ensure the output resembles this valid structure:

```text
src/
├── auth-module/                  kebab-case directory
│   ├── use-cases/                kebab-case directory
│   │   └── loginUser.use-case.ts camelCase for use cases
│   ├── models/
│   │   └── AuthUser.model.ts     PascalCase for models
│   └── controllers/
│       └── Auth.controller.ts    PascalCase for controllers
├── user-profile/                 kebab-case directory
│   ├── hooks/
│   │   └── useProfile.hook.ts    camelCase for hooks
│   └── views/
│       └── Profile.page.tsx      PascalCase for pages
```

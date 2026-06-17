---
trigger: always_on
---

# Naming Convention Rules

These rules are mandatory for all generated files and directories. The agent must always follow them when creating, renaming, or suggesting files.

## Source of Truth

The naming conventions defined in this document must remain synchronized with `ls-lint.yml`.

If there is any conflict between these rules and generated code, `ls-lint.yml` is the source of truth and takes precedence.

---

## Directory Rules

- All directories inside `apps/**/src/**` and `packages/**/src/**` must use **kebab-case**.
- Never use `PascalCase`, `camelCase`, or `snake_case` for directory names.

### Examples

#### Correct

- `student-management`
- `auth-module`
- `shared-components`

#### Incorrect

- `StudentManagement`
- `studentManagement`
- `student_management`

---

# File Rules by Layer & Type

## 1. General Files

### Standard TypeScript Files

- `.ts` files must use either:
    - `camelCase`
    - `PascalCase`

### Examples

#### Correct

- `studentService.ts`
- `StudentService.ts`

#### Incorrect

- `student-service.ts`
- `student_service.ts`

---

### Standard React Files

- `.tsx` files must use `PascalCase`.

### Examples

#### Correct

- `StudentForm.tsx`
- `Dashboard.tsx`

#### Incorrect

- `studentForm.tsx`
- `student-form.tsx`

---

# 2. Frontend Layer (React / TanStack)

## Hooks

Pattern:

```text
camelCase.hook.ts
```

Examples:

✅ `useAuth.hook.ts`
✅ `useStudents.hook.ts`

❌ `UseAuth.hook.ts`
❌ `use-auth.hook.ts`

---

## Pages

Pattern:

```text
PascalCase.page.tsx
```

Examples:

✅ `Dashboard.page.tsx`
✅ `Students.page.tsx`

---

## Layouts

Pattern:

```text
PascalCase.layout.tsx
```

Examples:

✅ `Main.layout.tsx`
✅ `Dashboard.layout.tsx`

---

## Adapters

Pattern:

```text
PascalCase.adapter.ts
```

Examples:

✅ `Student.adapter.ts`
✅ `Auth.adapter.ts`

---

## Schemas

Pattern:

```text
PascalCase.schema.ts
```

Examples:

✅ `Student.schema.ts`
✅ `Auth.schema.ts`

---

# 3. Domain Layer

## DTOs

Pattern:

```text
PascalCase.dto.ts
```

Examples:

✅ `RegisterStudent.dto.ts`
✅ `CreateUser.dto.ts`

---

## Models / Entities

Pattern:

```text
PascalCase.model.ts
```

Examples:

✅ `Student.model.ts`
✅ `User.model.ts`

---

## Projections

Pattern:

```text
PascalCase.projection.ts
```

Examples:

✅ `StudentSummary.projection.ts`

---

## Interfaces

Pattern:

```text
PascalCase.interface.ts
```

Examples:

✅ `StudentRepository.interface.ts`
✅ `ApiResponse.interface.ts`

---

## Datasource Contracts

Pattern:

```text
camelCase.datasource.ts
```

Examples:

✅ `student.datasource.ts`
✅ `auth.datasource.ts`

---

## Repository Contracts

Pattern:

```text
camelCase.repository.ts
```

Examples:

✅ `student.repository.ts`
✅ `auth.repository.ts`

---

# 4. Infrastructure Layer

## Datasource Implementations

Pattern:

```text
camelCase.datasource.impl.ts
```

Examples:

✅ `student.datasource.impl.ts`
✅ `auth.datasource.impl.ts`

---

## Mappers

Pattern:

```text
camelCase.mapper.ts
```

Examples:

✅ `student.mapper.ts`
✅ `auth.mapper.ts`

---

# 5. Application Layer

## Use Cases

Pattern:

```text
camelCase.use-case.ts
```

Examples:

✅ `registerStudent.use-case.ts`
✅ `createUser.use-case.ts`

### Important

Use Case classes must remain in PascalCase.

Example:

```ts
export class RegisterStudentUseCase {}
```

File:

```text
registerStudent.use-case.ts
```

---

# 6. Presentation Layer

## Controllers

Pattern:

```text
PascalCase.controller.ts
```

Examples:

✅ `Student.controller.ts`
✅ `Auth.controller.ts`

---

## Workers

Pattern:

```text
PascalCase.worker.ts
```

Examples:

✅ `Email.worker.ts`
✅ `Notification.worker.ts`

---

# SALC Architecture Conventions

When generating code for SALC architecture:

| Element                   | File Naming                  |
| ------------------------- | ---------------------------- |
| DTO                       | PascalCase.dto.ts            |
| Entity / Model            | PascalCase.model.ts          |
| Projection                | PascalCase.projection.ts     |
| Interface                 | PascalCase.interface.ts      |
| Datasource Contract       | camelCase.datasource.ts      |
| Repository Contract       | camelCase.repository.ts      |
| Datasource Implementation | camelCase.datasource.impl.ts |
| Mapper                    | camelCase.mapper.ts          |
| Use Case                  | camelCase.use-case.ts        |
| Controller                | PascalCase.controller.ts     |
| Worker                    | PascalCase.worker.ts         |
| Hook                      | camelCase.hook.ts            |
| Page                      | PascalCase.page.tsx          |
| Layout                    | PascalCase.layout.tsx        |
| Adapter                   | PascalCase.adapter.ts        |
| Schema                    | PascalCase.schema.ts         |

---

# Exceptions

## Configuration Layer

Path:

```text
packages/**/src/data/config/**
```

Rules:

- `.ts` files may use:
    - `camelCase`
    - `PascalCase`

---

## Models Layer

Path:

```text
packages/**/src/data/models/**
```

Rules:

- `.model.ts` files must use `PascalCase`.

---

# Forbidden Naming Styles

Never generate:

- snake_case file names
- UPPER_CASE file names
- mixed naming styles
- kebab-case TypeScript files unless explicitly required by the rules above

Examples:

❌ `student_service.ts`
❌ `STUDENT_SERVICE.ts`
❌ `student-service.ts`
❌ `Student-Service.ts`

Always validate file names against these rules before generating code.

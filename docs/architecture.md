# Frontend Core Architecture & Workflow

## Overview
This document defines the architectural guidelines and workflow for the `@salc/core` package. This package is completely agnostic of any UI framework (React, Vue, etc.). It strictly implements Clean Architecture to manage business logic, data fetching, and state transformation.

## Directory Structure
Features are modularized inside `packages/core/src/features/[feature-name]/`.
Each feature MUST adhere to the following layer segregation:

    [feature-name]/
    ├── application/
    │   └── use-cases/       # Orchestrates domain and infrastructure
    ├── domain/
    │   ├── datasources/     # Abstract classes/Interfaces for repositories
    │   ├── dtos/            # Data Transfer Objects (Input validation)
    │   └── entities/        # Pure business objects
    ├── infrastructure/
    │   ├── mappers/         # Transforms raw data to Entities using Zod
    │   ├── repositories/    # Implements datasources (HTTP calls)
    │   └── schemas/         # Zod schemas for validation
    └── di/                  # Dependency Injection setup

## Layer Constraints & Patterns

### 1. Domain Layer (`domain/`)
The absolute core of the system. It depends on NOTHING outside of the domain.

* **Entities:** Must be pure TypeScript classes containing business data. No HTTP logic.
* **DTOs (Data Transfer Objects):** * Must use the `Interface + Impl Class` pattern.
    * Must include a `private constructor`.
    * Must expose a `static create(data: Record<string, any>): DtoType` factory method.
    * Must throw a `CustomError.badRequest()` if validation fails before hitting the API.
* **DataSources:** Abstract classes defining the contract for the repositories.

### 2. Infrastructure Layer (`infrastructure/`)
Responsible for external communications (HTTP via `api`) and data transformation.

* **Repositories:**
    * Must implement the Domain `DataSource`.
    * Must use `api` (our Axios wrapper) for HTTP requests.
    * **CRITICAL:** Do NOT use `try/catch` blocks to handle network errors. `api` automatically intercepts HTTP errors and throws formatted `CustomError` instances. Let the error bubble up to the UI mutation cache.
* **Mappers & Schemas:**
    * Always define a Zod schema (`schemas/`) corresponding to the expected backend JSON response.
    * Mappers must use `DataAccessLayerAdapter.validateData(schema, rawData)` to parse the response.
    * Mappers construct and return the pure Domain Entities.

### 3. Application Layer (`application/`)
The orchestrator.

* **Use Cases:** * Must follow the Command pattern (a class with a single `execute` method).
    * Takes DTOs as input, calls the Repository, and returns `Promise<SuccessResponse<Entity>>`.

### 4. Dependency Injection (`di/`)
* Every feature must have a `[FeatureName]Module.ts` file.
* This file instantiates the Repositories and injects them into the Use Cases.
* The UI layer (React/Zustand) MUST only import the pre-instantiated Use Cases from this `di/` folder, never the Repositories directly.

## Data Flow Example (Creation Process)

1. **UI Level (Ignored by Core):** User submits a form.
2. **DTO Validation:** `CreateModuleDtoImpl.create(rawData)` is called. Throws `CustomError` if invalid.
3. **Use Case:** `createModuleUseCase.execute(validDto)` receives the payload.
4. **Repository:** `moduleRepository.create(dto)` sends the HTTP request via `this.api.post()`.
5. **Mapper:** The raw JSON response is parsed by `ModuleMapper` and converted into a `SuccessResponse<ModuleEntity>`.
6. **Return:** The Use Case returns the formatted response back to the UI.

## Error Handling
* Never throw generic `Error` objects.
* Always throw `CustomError` (e.g., `CustomError.badRequest('message')`, `CustomError.notFound()`).
* Network errors and 4xx/5xx responses are automatically intercepted by `api` and converted into `CustomError` arrays.
---
name: create-new-business-feature
description: Generates the core business layers (domain, infrastructure, application, di) for a new feature following Clean Architecture.
---

You are an expert Software Architect specializing in Clean Architecture and TypeScript. Your task is to generate the core business logic files for a new feature. You must NOT generate any UI, React components, or presentation logic.

### 1. Architectural Structure
You must generate the files strictly following this directory tree for the requested feature (e.g., `[feature-name]/`):

```text
├── application/
│   └── use-cases/
├── di/
├── domain/
│   ├── datasource/
│   ├── dtos/
│   ├── entities/
│   └── repository/
└── infrastructure/
    ├── datasources/
    ├── mappers/
    ├── repositories/
    └── schemas/
```

### 2. Generation Sequence & Examples

When the user asks to create a feature (e.g., "Category"), generate the files in the following order:

#### Step 1: Domain Layer

Generate the Entity, DTOs, and the DataSource interface.

```typescript
// domain/entities/Category.entity.ts
export interface CategoryEntity {
    categoryId: string;
    categoryName: string;
    createdAt: string;
}

export class CategoryEntityImpl implements CategoryEntity {
    constructor(
        public categoryId: string,
        public categoryName: string,
        public createdAt: string,
    ) {}
}

// domain/dtos/CreateCategory.dto.ts
export interface CreateCategoryDto {
    categoryName: string;
}

export class CreateCategoryDtoImpl implements CreateCategoryDto {
    private constructor(
        public readonly categoryName: string
    ) {}

    static create(category: CreateCategoryDto): CreateCategoryDto {
        if (!category.categoryName) {
            throw CustomError.badRequest('Missing category name');
        }

        return new CreateCategoryDtoImpl(category.categoryName);
    }
}

// domain/datasource/category.datasource.ts
export abstract class CategoryDataSource {
    abstract createCategory(category: CreateCategoryDto): Promise<SuccessResponse>;
}
```

#### Step 2: Infrastructure Layer

Generate the Zod schema, the Mapper, and the Repository implementation.

```typescript
// infrastructure/schemas/category.schema.ts
import z from "zod";

export const categorySchema = z.object({
    categoryId: z.string(),
    categoryName: z.string(),
    createdAt: z.string(),
});
```

```typescript
// infrastructure/mappers/category.mapper.ts
export class CategoryMapperImpl implements CategoryMapper {
    constructor(
        private readonly validator: EntityValidator<CategoryEntity>
    ) {}

    toEntity(rawObject: CategoryMapperProps): CategoryEntity {
        if (!rawObject) {
            throw CustomError.notFound("Category data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        // Transforma los datos crudos en una entidad pura de dominio
        return new CategoryEntityImpl(
            validationResponse.categoryId,
            validationResponse.categoryName,
            validationResponse.createdAt
        );
    }
}
```

```typescript
// infrastructure/repositories/category.repository.ts
export class CategoryRepositoryImpl implements CategoryDataSource {
    private readonly baseUrl = '/categories';

    constructor(
        private readonly api: Api,
        private readonly categoryMapper: CategoryMapper
    ) {}

    async createCategory(category: CreateCategoryDto): Promise<SuccessResponse> {
        const targetUrl = `${this.baseUrl}`;
        const rawResponse = await this.api.post<SuccessResponse, CreateCategoryDto>(targetUrl, category);

        return this.validationNullInformation(rawResponse);
    }
}
```

#### Step 3: Application Layer

Generate the Use Cases.

```typescript
// application/use-cases/createCategory.use-case.ts
interface CreateCategoryUseCase {
    execute(category: CreateCategoryDto): Promise<SuccessResponse>;
}

export class CreateCategoryUseCaseImpl implements CreateCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepositoryImpl
    ) {}

    async execute(category: CreateCategoryDto): Promise<SuccessResponse> {
        return this.categoryRepository.createCategory(category);
    }
}
```

#### Step 4: Dependency Injection Layer

Generate the module file to glue everything together.

```typescript
// di/CategoryModule.ts
const categoryValidator = validatorFactory.createValidator<CategoryEntity>(categorySchema);

export const categoryMapper = new CategoryMapperImpl(categoryValidator);
export const categoryRepository = new CategoryRepositoryImpl(api, categoryMapper);
export const createCategoryUseCase = new CreateCategoryUseCaseImpl(categoryRepository);
```

### Action Required

Ask the user for the name of the feature and the basic properties it should contain, then generate the full Core architecture based strictly on these rules.

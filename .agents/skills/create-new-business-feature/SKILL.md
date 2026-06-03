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
│   ├── datasources/
│   ├── dtos/
│   ├── entities/
│   ├── interfaces/
│   └── repositories/
└── infrastructure/
    ├── datasources/
    ├── mappers/
    ├── repositories/
    └── schemas/
```

### 2. Generation Sequence & Examples

When the user asks to create a feature (e.g., "Category"), generate the files in the following order:

#### Step 1: Domain Layer

Generate the Entity, DTOs, DataSource, and Repository interfaces.

```typescript
// domain/entities/Category.entity.ts
export class CategoryEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}

// domain/dtos/CreateCategory.dto.ts
import { CustomError } from "@salc/core/enums";

export interface CreateCategoryDto {
    name: string;
}

export class CreateCategoryDtoImpl implements CreateCategoryDto {
    private constructor(
        public readonly name: string
    ) {}

    static create(data: CreateCategoryDto): CreateCategoryDto {
        if (!data.name) {
            throw CustomError.badRequest('Missing category name');
        }

        return new CreateCategoryDtoImpl(data.name);
    }
}

// domain/datasources/Category.datasource.ts
import type { CreateCategoryDto } from "../dtos/CreateCategory.dto";
import type { CategoryEntity } from "../entities/Category.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class CategoryDataSource {
    abstract create(dto: CreateCategoryDto): Promise<SuccessResponse<CategoryEntity>>;
}

// domain/repositories/Category.repository.ts
import type { CreateCategoryDto } from "../dtos/CreateCategory.dto";
import type { CategoryEntity } from "../entities/Category.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class CategoryRepository {
    abstract create(dto: CreateCategoryDto): Promise<SuccessResponse<CategoryEntity>>;
}
```

#### Step 2: Infrastructure Layer

Generate the Zod schema, the Mapper, the DataSource implementation, and the Repository implementation.

```typescript
// infrastructure/schemas/Category.schema.ts
import { z } from "zod";

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export const arrayCategoriesSchema = z.array(categorySchema);
```

```typescript
// infrastructure/mappers/Category.mapper.ts
import { CustomError } from "@salc/core/enums";
import { CategoryEntity } from "../../domain/entities/Category.entity";
import { type EntityValidator } from "@salc/core/interfaces/EntityValidator";

type CategoryMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface CategoryMapper {
    toEntity(rawObject: CategoryMapperProps): CategoryEntity;
    toArrayEntities(rawObjects: CategoryMapperProps[]): CategoryEntity[];
}

export class CategoryMapperImpl implements CategoryMapper {
    constructor(
        private readonly validator: EntityValidator<CategoryEntity>,
        private readonly arrayValidator: EntityValidator<CategoryEntity[]>,
    ) {}

    toEntity(rawObject: CategoryMapperProps): CategoryEntity {
        if (!rawObject) {
            throw CustomError.notFound("Category data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new CategoryEntity(
            validationResponse.id,
            validationResponse.name,
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt)
        );
    }
    
    toArrayEntities(rawObjects: CategoryMapperProps[]): CategoryEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Categories data is missing");
        }
        const validationResponse = this.arrayValidator.validate(rawObjects);
        return validationResponse.map((category) => this.toEntity(category));
    }
}
```

```typescript
// infrastructure/datasources/Category.datasource.impl.ts
import type { CreateCategoryDto } from "../../domain/dtos/CreateCategory.dto";
import { type CategoryMapper } from "../mappers/Category.mapper";
import { CategoryDataSource } from "../../domain/datasources/Category.datasource";
import { type CategoryEntity } from "../../domain/entities/Category.entity";
import { type MethodsHttp, type SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class CategoryDataSourceImpl implements CategoryDataSource {
    private readonly baseUrl = "/categories";

    constructor(
        private readonly api: MethodsHttp,
        private readonly categoryMapper: CategoryMapper,
    ) {}

    async create(dto: CreateCategoryDto): Promise<SuccessResponse<CategoryEntity>> {
        const url = `${this.baseUrl}`;
        
        const rawResponse = await this.api.post<SuccessResponse<CategoryEntity>, CreateCategoryDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not create category");
        }

        const category = this.categoryMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: category,
        };
    }
}
```

```typescript
// infrastructure/repositories/Category.repository.impl.ts
import { CategoryDataSource } from "../../domain/datasources/Category.datasource";
import { CategoryRepository } from "../../domain/repositories/Category.repository";
import type { CreateCategoryDto } from "../../domain/dtos/CreateCategory.dto";
import type { CategoryEntity } from "../../domain/entities/Category.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(
        private readonly dataSource: CategoryDataSource
    ) {}

    async create(dto: CreateCategoryDto): Promise<SuccessResponse<CategoryEntity>> {
        return this.dataSource.create(dto);
    }
}
```

#### Step 3: Application Layer

Generate the Use Cases.

```typescript
// application/use-cases/CreateCategory.use-case.ts
import type { CategoryRepository } from "../../domain/repositories/Category.repository";
import type { CategoryEntity } from "../../domain/entities/Category.entity";
import type { CreateCategoryDto } from "../../domain/dtos/CreateCategory.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class CreateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(dto: CreateCategoryDto): Promise<SuccessResponse<CategoryEntity>> {
        return await this.categoryRepository.create(dto);
    }
}
```

#### Step 4: Dependency Injection Layer

Generate the module file to glue everything together.

```typescript
// di/CategoryModule.ts
import { CreateCategoryUseCase } from "../application/use-cases/CreateCategory.use-case";
import { CategoryDataSourceImpl } from "../infrastructure/datasources/Category.datasource.impl";
import { CategoryRepositoryImpl } from "../infrastructure/repositories/Category.repository.impl";
import { CategoryMapperImpl } from "../infrastructure/mappers/Category.mapper";
import { arrayCategoriesSchema, categorySchema } from "../infrastructure/schemas/Category.schema";
import { CategoryEntity } from "../domain/entities/Category.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const categoryValidator = validatorFactory.createValidator<CategoryEntity>(categorySchema);
const arrayCategoryValidator = validatorFactory.createValidator<CategoryEntity[]>(arrayCategoriesSchema);

//* Mapper
const categoryMapper = new CategoryMapperImpl(categoryValidator, arrayCategoryValidator);

//* Datasource
const categoryDataSource = new CategoryDataSourceImpl(api, categoryMapper);

//* Repositories
const categoryRepository = new CategoryRepositoryImpl(categoryDataSource);

//* Use Cases
export const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
```

### Action Required

Ask the user for the name of the feature and the basic properties it should contain, then generate the full Core architecture based strictly on these rules.

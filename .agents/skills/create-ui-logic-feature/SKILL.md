---
name: create-ui-logic-feature
description: Generates the UI logic layers (View Models, Mappers, and Custom Hooks) for a new feature, separating form state from use-case mutations.
---

You are an expert Frontend Architect specializing in React, TypeScript, and Clean Architecture. Your task is to generate the UI logic files for a new feature. You MUST NOT generate any `.tsx` files (UI components/pages). Focus exclusively on interfaces, mappers, and custom hooks.

### 1. Architectural Structure

You must generate the files strictly following this directory tree for the requested feature (e.g., `[feature-name]/`):

```text
├── application/
│   └── hooks/
│       ├── forms/
│       └── use-cases/
└── presentation/
    ├── interfaces/
    └── mappers/
```

### 2. Generation Sequence & Examples

When the user asks to create UI logic for a feature (e.g., "Product"), generate the files in the following order:

#### Step 1: Presentation - Interfaces (View Models)

Generate the `BaseFormValues` interface representing the raw, flexible state of the UI form. Note that the UI manages flexible types like `Date` whereas the Domain DTO might require a strict `string`.

```typescript
// presentation/interfaces/BaseProductFormValues.interface.ts
export interface BaseProductFormValues {
    productName: string;
    productPrice: string; // En la UI suele manejarse como string en los inputs
    releaseDate: Date; // Usamos Date en la UI, se formatea en el mapper
    stockAvailable: boolean;
}
```

#### Step 2: Presentation - Mappers

Generate the Mapper to translate between the UI View Model and the Domain DTOs/Entities.

```typescript
// presentation/mappers/ProductForm.mapper.ts
import { format } from "date-fns";
import type { BaseProductFormValues } from "../interfaces/BaseProductFormValues.interface";
import { CreateProductDtoImpl, type CreateProductDto } from "@salc/core/features/admin-desk/products/domain/dtos";
import type { ProductEntity } from "@salc/core/features/admin-desk/products/domain/entities/Product.entity";

export class ProductFormMapper {
    // Transforma los datos crudos del formulario al DTO validado
    public static toCreateDto(formValues: BaseProductFormValues): CreateProductDto {
        const formattedReleaseDate = format(formValues.releaseDate, 'yyyy-MM-dd');

        return CreateProductDtoImpl.create({
            productName: formValues.productName.trim(),
            productPrice: Number(formValues.productPrice),
            releaseDate: formattedReleaseDate,
            stockAvailable: formValues.stockAvailable
        });
    }

    // Mapeo Inverso: Transforma la Entidad del dominio al estado de la vista para actualizar
    public static toBaseFormValues(productEntity: ProductEntity): BaseProductFormValues {
        return {
            productName: productEntity.productName,
            productPrice: productEntity.productPrice.toString(),
            releaseDate: productEntity.releaseDate, // La entidad ya devuelve Date
            stockAvailable: productEntity.stockAvailable
        };
    }
}
```

#### Step 3: Application - Use-Cases Hooks

Generate the TanStack Query hook that acts as the adapter for the core use case. It MUST receive the BaseFormValues, use the Mapper, and call the use case.

```typescript
// application/hooks/use-cases/useCreateProduct.use.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { createProductUseCase } from "@salc/core/features/admin-desk/products/di/ProductModule";
import { ProductFormMapper } from "../../../presentation/mappers/ProductForm.mapper";
import type { BaseProductFormValues } from "../../../presentation/interfaces/BaseProductFormValues.interface";

interface UseCreateProductProps {
    reset: UseFormReset<BaseProductFormValues>;
}

export const useCreateProduct = ({ reset }: UseCreateProductProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseProductFormValues) => {
            // Delega la transformación de datos al mapper visual
            const validDataTransferObject = ProductFormMapper.toCreateDto(formData);

            return await createProductUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        },
        onError: (error: any) => {
            ShowMessageAdapter.error(error.message || "Ocurrió un error al crear el registro");
        }
    });
};
```

#### Step 4: Application - Forms Hooks

Generate the react-hook-form hook that manages the visual state and consumes the use-case hook.

```typescript
// application/hooks/forms/useCreateProductForm.use.ts
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../use-cases/useCreateProduct.use";
import type { BaseProductFormValues } from "../../../presentation/interfaces/BaseProductFormValues.interface";

export const useCreateProductForm = () => {
    const defaultValues: BaseProductFormValues = {
        productName: '',
        productPrice: '',
        releaseDate: new Date(),
        stockAvailable: true
    };

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<BaseProductFormValues>({
        defaultValues
    });

    const { mutate: createProductMutation, isPending: isSubmitting } = useCreateProduct({ reset });

    const onSubmit = (formData: BaseProductFormValues) => {
        createProductMutation(formData);
    };

    return {
        errors,
        control,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting
    };
};
```

### Action Required

Ask the user for the name of the feature and the basic fields it should contain, then generate the full UI logic architecture based strictly on these rules. Do not generate `.tsx` components.

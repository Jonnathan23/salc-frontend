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

Generate the `BaseFormValues` interface representing the raw, flexible state of the UI form.

```typescript
// presentation/interfaces/BaseProductFormValues.interface.ts
export interface BaseProductFormValues {
    productName: string;
    productPrice: string; // En la UI suele manejarse como string antes de transformarse
    stockAvailable: boolean;
}
```

#### Step 2: Presentation - Mappers

Generate the Mapper to translate between the UI View Model and the Domain DTOs/Entities.

```typescript
// presentation/mappers/ProductFormMapper.ts
import type { BaseProductFormValues } from "../interfaces/BaseProductFormValues.interface";
import { CreateProductDtoImpl, type CreateProductDto } from "@salc/core/features/admin-desk/products/domain/dtos";
import type { ProductEntity } from "@salc/core/features/admin-desk/products/domain/entities/Product.entity";

export class ProductFormMapper {
    // Transforma los datos crudos del formulario al DTO validado
    public static toCreateDto(formValues: BaseProductFormValues): CreateProductDto {
        return CreateProductDtoImpl.create({
            productName: formValues.productName.trim(),
            productPrice: Number(formValues.productPrice),
            stockAvailable: formValues.stockAvailable
        });
    }

    // Mapeo Inverso: Transforma la Entidad del dominio al estado de la vista para actualizar
    public static toBaseFormValues(productEntity: ProductEntity): BaseProductFormValues {
        return {
            productName: productEntity.productName,
            productPrice: productEntity.productPrice.toString(),
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
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { createProductUseCase } from "@salc/core/features/admin-desk/products/di/ProductModule";
import { ProductFormMapper } from "../../../presentation/mappers/ProductFormMapper";
import type { BaseProductFormValues } from "../../../presentation/interfaces/BaseProductFormValues.interface";

interface UseCreateProductProps {
    handleSuccess: () => void;
}

export const useCreateProduct = ({ handleSuccess }: UseCreateProductProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseProductFormValues) => {
            // Delega la transformación de datos al mapper visual
            const validDataTransferObject = ProductFormMapper.toCreateDto(formData);

            return await createProductUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            ShowMessageAdapter.success(successResponse.message);
            handleSuccess();
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../use-cases/useCreateProduct.use";
import type { BaseProductFormValues } from "../../../presentation/interfaces/BaseProductFormValues.interface";

export const useCreateProductForm = () => {
    // Estado local para manejar el éxito visual en la UI
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const defaultValues: BaseProductFormValues = {
        productName: '',
        productPrice: '',
        stockAvailable: true
    };

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<BaseProductFormValues>({
        defaultValues
    });

    const handleSuccess = () => {
        setSubmitSuccess(true);
        reset();

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    const { mutate: createProductMutation, isPending: isSubmitting } = useCreateProduct({ handleSuccess });

    const onSubmit = (formData: BaseProductFormValues) => {
        createProductMutation(formData);
    };

    return {
        submitSuccess,
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

# Documentación de Flujo de Datos (Arquitectura Limpia - SALC)

Este documento detalla el flujo de datos completo para una característica (`feature`), tomando como referencia la implementación de `admin-desk/modules`. El flujo atraviesa las capas de `Domain`, `Infrastructure` y `Application`, asegurando el desacoplamiento y siguiendo estrictamente los principios de Clean Architecture.

## 1. Capa Domain (Contratos)

Es el núcleo del sistema. Aquí residen las reglas de negocio y no existe conocimiento de las capas externas.

### Entity (`domain/entities/Module.entity.ts`)
Define el modelo de negocio puro. Representa la estructura estricta que la aplicación entiende y maneja.

```typescript
// Define el contrato estricto de la entidad en la capa de negocio
export interface ModuleEntity {
    mo_id: string;
    mo_name: string;
    mo_description: string;
    mo_created_at: string;
    mo_updated_at: string;
}

// Implementación concreta utilizada para instanciar objetos seguros en la aplicación
export class ModuleEntityImpl implements ModuleEntity {
    constructor(
        public mo_id: string,
        public mo_name: string,
        public mo_description: string,
        public mo_created_at: string,
        public mo_updated_at: string,
    ) { }
}
```

### DTO (`domain/dtos/CreateModule.dto.ts`)
Data Transfer Object. Transporta y encapsula la validación de datos de entrada antes de que interactúen con la lógica de negocio principal.

```typescript
export interface CreateModuleDto {
    mo_name: string;
    mo_description: string;
}

export class CreateModuleDtoImpl implements CreateModuleDto {
    private constructor(
        public readonly mo_name: string,
        public readonly mo_description: string
    ) { }

    // Método de fábrica estático que centraliza la validación de datos
    static create(module: CreateModuleDto): CreateModuleDto {
        // Validación de reglas de negocio en la capa más profunda
        if (!module.mo_name) {
            throw CustomError.badRequest('Missing name');
        }
        
        if (!module.mo_description) {
            throw CustomError.badRequest('Missing description');
        }

        // Si la validación es exitosa, se crea y retorna un DTO inmutable
        return new CreateModuleDtoImpl(module.mo_name, module.mo_description);
    }
}
```

### DataSource / Repository Interface (`domain/datasource/module.datasource.ts`)
Define los contratos abstractos para la persistencia u obtención de datos. Actúa como el puente que la capa de infraestructura deberá implementar obligatoriamente.

```typescript
// Contrato abstracto de acceso a datos sin especificar la tecnología subyacente
export abstract class ModuleDataSource {
    abstract getAllModules(): Promise<SuccessResponse<ModuleEntity[]>>;
    abstract getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>>;
    abstract createModule(module: CreateModuleDto): Promise<SuccessResponse>;
    abstract updateModule(id: string, module: UpdateModuleDto): Promise<SuccessResponse>;
    abstract deleteModule(id: string): Promise<SuccessResponse>;
}
```

## 2. Capa Infrastructure (Persistencia)

Aquí se implementan los detalles técnicos: llamadas a APIs, validación de respuestas externas y adaptaciones de datos (Mappers).

### Schema (`infrastructure/schemas/module.schema.ts`)
Define esquemas con Zod para garantizar que los datos procedentes del mundo exterior (API) tengan la forma correcta.

```typescript
import z from "zod";

// Define la estructura y restricciones de la respuesta en bruto proveniente del exterior
export const moduleSchema = z.object({
    mo_id: z.string(),
    mo_name: z.string(),
    mo_description: z.string().min(3).max(255),
    mo_created_at: z.string(),
    mo_updated_at: z.string(),
});

export const arrayModulesSchema = z.array(moduleSchema);
```

### Mapper (`infrastructure/mapper/module.mapper.ts`)
Transforma los datos sucios o en bruto en instancias de `Entity`, asegurando que la capa de aplicación solo trabaje con objetos purificados.

```typescript
export interface ModuleMapper {
    toEntity(rawObject: ModuleMapperProps): ModuleEntity;
    toArrayEntities(rawObjects: ModuleMapperProps[]): ModuleEntity[];
}

type ModuleMapperProps = Record<string, unknown> | unknown | null | undefined;

export class ModuleMapperImpl implements ModuleMapper {
    constructor(
        private readonly validator: EntityValidator<ModuleEntity>,
        private readonly arrayValidator: EntityValidator<ModuleEntity[]>
    ) { }

    // Recibe un objeto genérico e intenta mapearlo hacia la entidad pura
    toEntity(rawObject: ModuleMapperProps): ModuleEntity {
        if (!rawObject) {
            throw CustomError.notFound("Module data is missing");
        }

        // Valida el objeto contra el schema de Zod para descartar irregularidades
        const validationResponse = this.validator.validate(rawObject);

        // Transforma los datos sanitizados en una entidad estricta
        return new ModuleEntityImpl(
            validationResponse.mo_id,
            validationResponse.mo_name,
            validationResponse.mo_description,
            validationResponse.mo_created_at,
            validationResponse.mo_updated_at
        );
    }
    
    // ... Implementación de toArrayEntities
}
```

### Repository Implementation (`infrastructure/repositories/module.repository.ts`)
Implementa el `DataSource` definido en `Domain`. Orquesta la obtención de datos mediante la API y delega la transformación al Mapper.

```typescript
// Cumple el contrato exigido por la capa de Dominio
export class ModuleRepositoryImpl implements ModuleDataSource {
    private readonly baseUrl = '/modules';

    constructor(
        private readonly api: Api,
        private readonly moduleMapper: ModuleMapper,
        private readonly nullResponseValidator: EntityValidator<SuccessResponse>
    ) { }

    async getModuleById(moduleId: string): Promise<SuccessResponse<ModuleEntity>> {
        const url = `${this.baseUrl}/${moduleId}`;
        
        // Petición no confiable al mundo exterior, recibe datos crudos
        const rawResponse = await this.api.get<SuccessResponse<ModuleEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No module found");
        }

        // Transforma lo crudo en lo puro mediante el Mapper
        const module = this.moduleMapper.toEntity(rawResponse.data);

        // Responde finalmente con la entidad asegurada
        return {
            ...rawResponse,
            data: module
        };
    }

    async createModule(module: CreateModuleDto): Promise<SuccessResponse> {
        const url = `${this.baseUrl}`;
        
        // El DTO (ya validado en Application) actúa como body seguro
        const rawResponse = await this.api.post<SuccessResponse, CreateModuleDto>(url, module);

        return this.validationNullInformation(rawResponse);
    }
    
    // ... Implementación de otros métodos
}
```

## 3. Capa Application

### Use Case (`application/use-cases/createModule.use-case.ts`)
Representa una intención del usuario. Consume el repositorio para ejecutar operaciones sobre las entidades o enviar datos al exterior.

```typescript
interface CreateModuleUseCase {
    execute(module: CreateModuleDto): Promise<SuccessResponse>;
}

export class CreateModuleUseCaseImpl implements CreateModuleUseCase {
    // Inyección de dependencias de la implementación del Repositorio
    constructor(
        private readonly moduleRepository: ModuleRepositoryImpl
    ) { }

    // Punto de entrada orquestador. Toma un DTO validado y delega la responsabilidad a la persistencia
    async execute(module: CreateModuleDto): Promise<SuccessResponse> {
        return this.moduleRepository.createModule(module);
    }
}
```

## 4. DI Module (El Pegamento)

El módulo de Inyección de Dependencias (DI) es el encargado de unir todas las piezas independientes. Instancia validadores, mappers, repositorios y finalmente exporta los casos de uso listos para ser consumidos por la aplicación React.

### ModuleModule (`packages/core/src/features/admin-desk/modules/di/ModuleModule.ts`)

```typescript
import { CreateModuleUseCaseImpl } from "@salc/core/features/admin-desk/modules/application";
import { arrayModulesSchema, moduleSchema } from "@salc/core/features/admin-desk/modules/infrastructure/schemas/module.schema";
import { ModuleRepositoryImpl } from "@salc/core/features/admin-desk/modules/infrastructure/repositories/module.repository";
import { ModuleMapperImpl } from "@salc/core/features/admin-desk/modules/infrastructure/mapper/module.mapper";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { nullResponseValidator, validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

// 1. Instanciamos los validadores usando la Factory y los Schemas de Zod
const moduleValidator = validatorFactory.createValidator<ModuleEntity>(moduleSchema);
const arrayModuleValidator = validatorFactory.createValidator<ModuleEntity[]>(arrayModulesSchema);

// 2. Instanciamos el Mapper inyectándole los validadores
export const moduleMapper = new ModuleMapperImpl(
    moduleValidator,
    arrayModuleValidator
);

// 3. Instanciamos el Repository inyectando la API, el Mapper y el validador de respuestas nulas
export const moduleRepository = new ModuleRepositoryImpl(api, moduleMapper, nullResponseValidator);

// 4. Instanciamos y exportamos el Caso de Uso inyectando el Repository
export const createModuleUseCase = new CreateModuleUseCaseImpl(moduleRepository);

// ... (Otros Use Cases exportados de la misma forma)
```

## 5. Aplicación Frontend (Hooks y Vista)

En la aplicación React (ej. AdminDesk o ClassTrack), consumimos los Casos de Uso a través de Custom Hooks que integran herramientas como TanStack Query, manejando los estados de carga, error y éxito, y conectando los datos validados con la interfaz de usuario.

### Custom Hook con TanStack Query (`apps/admin-desk/src/features/modules/application/hooks/useCreateModule.use.ts`)
Conecta el `UseCase` con el ecosistema de React usando `useMutation`. 

```typescript
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { createModuleUseCase } from "@salc/core/features/admin-desk/modules/di/ModuleModule";
import { CreateModuleDtoImpl, type CreateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form";

interface UseCreateModuleProps {
    reset: UseFormReset<CreateModuleDto>;
}

export const useCreateModule = ({ reset }: UseCreateModuleProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        // La función de mutación que recibe el DTO bruto desde el formulario
        mutationFn: async (data: CreateModuleDto) => {
            // 1. Validamos y purificamos los datos usando el método estático del DTO
            const validDto = CreateModuleDtoImpl.create(data);

            // 2. Ejecutamos el caso de uso importado directamente desde el DI Module
            return await createModuleUseCase.execute(validDto);
        },
        onSuccess: (successResponse) => {
            // Manejo del ciclo de vida post-mutación
            queryClient.invalidateQueries({ queryKey: ["modules"] });
            reset(); // Limpia el formulario
            ShowMessageAdapter.success(successResponse.message); // Notifica al usuario
        }
    });
}
```

### Componente React (Extracto de Vista)
El componente consume el hook de estado del formulario y delega la ejecución de la lógica al enviar.

```tsx
import { Button } from "@/core/components/buttons/button";
import { useCreateModuleForm } from "@/features/modules/application/hooks";
import { ModuleForm } from "@/features/modules/presentation/components/ModuleForm";
import { Loader2 } from "lucide-react";

export default function CreateModuleForm() {
    // Obtenemos los métodos del formulario y el estado de la mutación (isPending)
    const { register, handleSubmit, errors, onSubmit, isPending } = useCreateModuleForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campos del formulario manejados con react-hook-form */}
            <ModuleForm register={register} errors={errors} />

            <Button type="submit" disabled={isPending}>
                {isPending ? (
                    <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando...
                    </div>
                ) : (
                    'Registrar'
                )}
            </Button>
        </form>
    );
}
```

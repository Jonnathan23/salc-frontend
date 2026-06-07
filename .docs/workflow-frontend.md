# Documentación de Flujo de Datos (Arquitectura Limpia - SALC)

Este documento detalla el flujo de datos completo para una característica (`feature`), tomando como referencia la implementación de `admin-desk/students`. El flujo atraviesa las capas de `Domain`, `Infrastructure` y `Application`, asegurando el desacoplamiento y siguiendo estrictamente los principios de Clean Architecture.

## 1. Capa Domain (Contratos)

Es el núcleo del sistema. Aquí residen las reglas de negocio y no existe conocimiento de las capas externas.

### Entity (`domain/entities/Student.entity.ts`)
Define el modelo de negocio puro. Representa la estructura estricta que la aplicación entiende y maneja.

```typescript
import type { StudentContractStatus, StudentProgressCategory } from "@salc/core/features/admin-desk/students/domain/interfaces";

export class StudentEntity {
    constructor(
        public readonly id: string,
        public readonly identificationCard: string,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly dateOfBirth: Date,
        public readonly nationality: string,
        public readonly certificateType: string,
        public readonly startDate: Date,
        public readonly isGraduated: boolean,
        public readonly contractStatus: StudentContractStatus,
        public readonly progressCategory: StudentProgressCategory,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
```

### DTO (`domain/dtos/RegisterStudent.dto.ts`)
Data Transfer Object. Transporta y encapsula la validación de datos de entrada antes de que interactúen con la lógica de negocio principal.

```typescript
import { CustomError } from "@salc/core/enums";
import { type CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { Validators } from "@salc/core/utils";

export interface RegisterStudentDto {
    identificationCard: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; 
    nationality: string;
    certificateType: CertificateType;
    startDate: string; 
}

export class RegisterStudentDtoImpl implements RegisterStudentDto {
    private constructor(
        public readonly identificationCard: string,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly dateOfBirth: string,
        public readonly nationality: string,
        public readonly certificateType: CertificateType,
        public readonly startDate: string
    ) { }

    static create(data: RegisterStudentDto): RegisterStudentDto {
        const { identificationCard, fullName, phoneNumber, email, dateOfBirth, nationality, certificateType, startDate } = data;

        if (!identificationCard) throw CustomError.badRequest('Missing identificationCard');
        if (!fullName) throw CustomError.badRequest('Missing fullName');
        // ... validaciones de los demás campos
        
        if (!Validators.isIdentificationCard(identificationCard)) throw CustomError.badRequest('Invalid identificationCard');
        if (!Validators.isPhoneNumber(phoneNumber)) throw CustomError.badRequest('Invalid phoneNumber');
        // ... demás validaciones con utilidades o expresiones regulares

        return new RegisterStudentDtoImpl(
            identificationCard,
            fullName,
            phoneNumber,
            email,
            dateOfBirth,
            nationality,
            certificateType,
            startDate
        );
    }
}
```

### DataSource / Repository Interface (`domain/datasources/Student.datasource.ts`)
Define los contratos abstractos para la persistencia u obtención de datos. Actúa como el puente que la capa de infraestructura deberá implementar obligatoriamente.

```typescript
import type { ChangeContractStatusDto, RegisterStudentDto, UpdateStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class StudentDataSource {
    abstract register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>>;
    abstract search(query: string): Promise<SuccessResponse<StudentEntity[]>>;
    abstract getAllStudents(): Promise<SuccessResponse<StudentEntity[]>>;
    abstract update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>>;
    abstract changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>>;
    abstract toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>>;
    abstract deactivate(id: string): Promise<SuccessResponse<StudentEntity>>;
}
```

## 2. Capa Infrastructure (Persistencia)

Aquí se implementan los detalles técnicos: llamadas a APIs, validación de respuestas externas y adaptaciones de datos (Mappers).

### Schema (`infrastructure/schemas/Student.schema.ts`)
Define esquemas con Zod para garantizar que los datos procedentes del mundo exterior (API) tengan la forma correcta.

```typescript
import { z } from "zod";

export const studentSchema = z.object({
    id: z.string(),
    identificationCard: z.string(),
    fullName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    dateOfBirth: z.string().or(z.date()),
    nationality: z.string(),
    certificateType: z.string(),
    startDate: z.string().or(z.date()),
    isGraduated: z.boolean(),
    contractStatus: z.string(),
    progressCategory: z.string(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date())
});

export const arrayStudentsSchema = z.array(studentSchema);
```

### Mapper (`infrastructure/mappers/Student.mapper.ts`)
Transforma los datos sucios o en bruto en instancias de `Entity`, asegurando que la capa de aplicación solo trabaje con objetos purificados.

```typescript
import { CustomError } from "@salc/core/enums";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { type EntityValidator } from "@salc/core/interfaces/EntityValidator";

type StudentMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface StudentMapper {
    toEntity(rawObject: StudentMapperProps): StudentEntity;
    toArrayEntities(rawObjects: StudentMapperProps[]): StudentEntity[];
}

export class StudentMapperImpl implements StudentMapper {
    constructor(
        private readonly validator: EntityValidator<StudentEntity>,
        private readonly arrayValidator: EntityValidator<StudentEntity[]>,
    ) {}

    // Parseo de fechas u otros tipos necesarios
    private parseLocalDate(dateValue: string | Date): Date {
        // ... implementación ...
    }

    toEntity(rawObject: StudentMapperProps): StudentEntity {
        if (!rawObject) {
            throw CustomError.notFound("Student data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        const parsedDateOfBirth = this.parseLocalDate(validationResponse.dateOfBirth);
        const parsedStartDate = this.parseLocalDate(validationResponse.startDate);

        return new StudentEntity(
            validationResponse.id,
            validationResponse.identificationCard,
            validationResponse.fullName,
            // ... demás campos
            validationResponse.contractStatus as any,
            validationResponse.progressCategory as any,
            new Date(validationResponse.createdAt),
            new Date(validationResponse.updatedAt),
        );
    }
    
    // ... Implementación de toArrayEntities
}
```

### Repository Implementation (`infrastructure/datasources/Student.datasource.impl.ts`)
Implementa el `DataSource` definido en `Domain`. Orquesta la obtención de datos mediante la API y delega la transformación al Mapper.

```typescript
import type { RegisterStudentDto, UpdateStudentDto, ChangeContractStatusDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import { type StudentMapper } from "@salc/core/features/admin-desk/students/infrastructure/mappers/Student.mapper";
import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/Student.datasource";
import { type StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { type MethodsHttp, type SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class StudentDataSourceImpl implements StudentDataSource {
    private readonly baseUrl = "/students";

    constructor(
        private readonly apiStudents: MethodsHttp,
        private readonly studentMapper: StudentMapper,
    ) {}

    async register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/register`;
        
        const rawResponse = await this.apiStudents.post<SuccessResponse<StudentEntity>, RegisterStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not register student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }
    
    // ... Implementación de otros métodos (getAllStudents, update, etc.)
}
```

## 3. Capa Application

### Use Case (`application/use-cases/RegisterStudent.use-case.ts`)
Representa una intención del usuario. Consume el repositorio para ejecutar operaciones sobre las entidades o enviar datos al exterior.

```typescript
import type { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/Student.datasource";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import type { SuccessResponse } from "@salc/core/interfaces";

export class RegisterStudentUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.register(dto);
    }
}
```

## 4. DI Module (El Pegamento)

El módulo de Inyección de Dependencias (DI) es el encargado de unir todas las piezas independientes. Instancia validadores, mappers, repositorios y finalmente exporta los casos de uso listos para ser consumidos por la aplicación React.

### StudentModule (`packages/core/src/features/admin-desk/students/di/StudentModule.ts`)

```typescript
import { RegisterStudentUseCase } from "@salc/core/features/admin-desk/students/application/use-cases/RegisterStudent.use-case";
import { StudentDataSourceImpl } from "@salc/core/features/admin-desk/students/infrastructure/datasources/Student.datasource.impl";
import { StudentRepositoryImpl } from "@salc/core/features/admin-desk/students/infrastructure/repositories/Student.repository.impl";
import { StudentMapperImpl } from "@salc/core/features/admin-desk/students/infrastructure/mappers/Student.mapper";
import { arrayStudentsSchema, studentSchema } from "@salc/core/features/admin-desk/students/infrastructure/schemas/Student.schema";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { validatorFactory } from "@salc/core/adapters";
import { api } from "@salc/core/lib";

//* Validators
const studentValidator = validatorFactory.createValidator<StudentEntity>(studentSchema);
const arrayStudentValidator = validatorFactory.createValidator<StudentEntity[]>(arrayStudentsSchema);

//* Mapper
const studentMapper = new StudentMapperImpl(studentValidator, arrayStudentValidator);

//* Datasource
const studentDataSource = new StudentDataSourceImpl(api, studentMapper);

//* Repositories
const studentRepository = new StudentRepositoryImpl(studentDataSource);

//* Use Cases
export const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);

// ... (Otros Use Cases exportados de la misma forma)
```

## 5. Capa Presentation (View Models y Mappers)

En la arquitectura limpia, la capa de presentación no debe acoplarse directamente a las estructuras de datos del dominio o de la infraestructura. Aunque es común ver que las vistas de React interactúan directamente con los DTOs, este enfoque presenta serios inconvenientes en aplicaciones escalables:

1. **Desacoplamiento de la UI**: El estado de un formulario de React (manejado con herramientas como `react-hook-form`) suele ser transitorio y flexible (por ejemplo, formato Date en vez de strings para las fechas). Por otro lado, los DTOs del dominio imponen reglas estrictas.
2. **Separación de Responsabilidades**: Las interfaces de formulario (`BaseStudentFormValues`) representan el "View Model" o estado de la vista, permitiendo definir tipos específicos para los inputs de la UI, mientras que los mappers de interfaz de usuario (`StudentFormMapper`) actúan como traductores unidireccionales que transforman este estado transitorio en un DTO válido para el caso de uso.

### View Model / Form Values (`apps/admin-desk/src/features/students/presentation/interfaces/BaseFormValues.interface.ts`)
Define el estado transitorio e intermedio de la interfaz de usuario para el formulario.

```typescript
import type { CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export interface BaseStudentFormValues {
    identificationCard: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date; // La UI maneja Date, pero el DTO necesita string
    nationality: string;
    certificateType: CertificateType;
    startDate: Date;
}
```

### Form Mapper (`apps/admin-desk/src/features/students/presentation/mappers/StudentForm.mapper.ts`)
Clase utilitaria que traduce el formato flexible e informal de la UI (`BaseStudentFormValues`) al DTO formal y validado que espera la capa de dominio (`RegisterStudentDto`).

```typescript
import { format } from "date-fns";
import type { BaseStudentFormValues } from "@/features/students/presentation/interfaces";
import { RegisterStudentDtoImpl, type RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";

export class StudentFormMapper {
    public static toRegisterDto(formValues: BaseStudentFormValues): RegisterStudentDto {
        const formattedDateOfBirth = format(formValues.dateOfBirth, 'yyyy-MM-dd');
        const formattedStartDate = format(formValues.startDate, 'yyyy-MM-dd');

        return RegisterStudentDtoImpl.create({
            identificationCard: formValues.identificationCard.trim(),
            fullName: formValues.fullName.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            email: formValues.email.trim().toLowerCase(),
            dateOfBirth: formattedDateOfBirth, // Conversión a string estricto
            nationality: formValues.nationality,
            certificateType: formValues.certificateType,
            startDate: formattedStartDate
        });
    }
    // ...
}
```

## 6. Aplicación Frontend (Hooks y Vista)

En la aplicación React (ej. AdminDesk), consumimos los Casos de Uso a través de Custom Hooks que integran herramientas como TanStack Query. Estos hooks interceptan la interacción del usuario, empleando el `StudentFormMapper` para convertir los valores del formulario en el DTO correspondiente, antes de invocar la ejecución del `UseCase`.

### Custom Hook con TanStack Query (`apps/admin-desk/src/features/students/application/hooks/use-cases/useRegisterStudent.use.ts` - Estructura referencial)
Conecta el `UseCase` con el ecosistema de React usando `useMutation` e intercepta el envío de datos mediante el uso de `StudentFormMapper`.

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { registerStudentUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";
import { StudentFormMapper } from "@/features/students/presentation/mappers/StudentForm.mapper";
import type { BaseStudentFormValues } from "@/features/students/presentation/interfaces";

interface UseRegisterStudentProps {
    reset: UseFormReset<BaseStudentFormValues>;
}

export const useRegisterStudent = ({ reset }: UseRegisterStudentProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        // La mutación recibe los datos flexibles de la UI
        mutationFn: async (formData: BaseStudentFormValues) => {
            // 1. Mapear datos UI a DTO estricto
            const validDataTransferObject = StudentFormMapper.toRegisterDto(formData);

            // 2. Ejecutar caso de uso
            return await registerStudentUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        },
        onError: (error: any) => {
            ShowMessageAdapter.error(error.message || "An unexpected error occurred");
        }
    });
}
```

### 6.1 Actualización con Custom Hook (Mapeo Inverso)

El flujo de actualización requiere un paso adicional y crucial: **el mapeo inverso**. Cuando deseamos editar un registro, obtenemos la `Entity` estricta del dominio.
Dado que nuestro formulario espera un `BaseStudentFormValues` (el View Model temporal de la UI), **es un antipatrón inyectar la Entidad directamente en los `defaultValues` del formulario**.

#### 1. Mapeo Inverso en el Form Mapper
Agregamos un método que tome la entidad y devuelva el View Model.

```typescript
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { BaseStudentFormValues } from "@/features/students/presentation/interfaces";
import type { CertificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export class StudentFormMapper {
    // ...
    public static toBaseFormValues(studentEntity: StudentEntity): BaseStudentFormValues {
        return {
            identificationCard: studentEntity.identificationCard,
            fullName: studentEntity.fullName,
            phoneNumber: studentEntity.phoneNumber,
            email: studentEntity.email,
            dateOfBirth: studentEntity.dateOfBirth, // La entidad ya provee Date
            nationality: studentEntity.nationality,
            certificateType: studentEntity.certificateType as CertificateType,
            startDate: studentEntity.startDate
        };
    }
}
```

#### 2. Intercepción en el Componente de Actualización
El componente padre intercepta la entidad, la mapea y la inyecta limpia al Custom Hook del formulario.

```typescript
// features/students/presentation/components/UpdateStudent.tsx (Estructura Referencial)
import { StudentFormMapper } from "@/features/students/presentation/mappers/StudentForm.mapper";
// ... imports

interface UpdateStudentProps {
    studentId: string;
    studentEntity: StudentEntity; 
}

export default function UpdateStudent({ studentId, studentEntity }: UpdateStudentProps) {
    // 1. Intercepción y Mapeo
    const initialFormValues = StudentFormMapper.toBaseFormValues(studentEntity);

    // 2. Inyectar datos compatibles al hook
    const { 
        register, 
        handleSubmit, 
        errors, 
        onSubmit, 
        isSubmitting 
    } = useUpdateStudentForm({
        defaultValues: initialFormValues,
        id: studentId
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <StudentForm 
                register={register} 
                errors={errors} 
                isEditing={true} 
            />
            {/* ... botones ... */}
        </form>
    );
}
```

Al aplicar este patrón, garantizamos que el formulario es reutilizable tanto para registrar como para actualizar, y se manejan de manera segura los datos recibidos del dominio.
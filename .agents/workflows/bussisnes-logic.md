---
description: Flujo de datos Clean Architecture (Domain, Infra, Application y Presentation) detallando entidades, DTOs, Mappers, Repositorios, Casos de Uso y la UI.
---

# Flujo de Datos - Clean Architecture (SALC)

Este workflow resume el flujo de datos completo para una feature en el frontend, atravesando las distintas capas para asegurar el desacoplamiento.

## 1. Capa Domain (Reglas de Negocio)
- **Entity**: El modelo de negocio puro y estricto (ej. `StudentEntity`).
- **DTO**: Data Transfer Object que encapsula y valida datos de entrada (ej. `RegisterStudentDto`).
- **DataSource/Repository Interface**: Contratos abstractos para persistencia y obtención de datos (ej. `StudentDataSource`).

## 2. Capa Infrastructure (Persistencia Técnica)
- **Schema**: Esquemas Zod para garantizar la forma de los datos externos (ej. `studentSchema`).
- **Mapper**: Transforma datos en bruto a instancias de `Entity` purificadas (ej. `StudentMapperImpl`).
- **Repository Implementation**: Implementa el DataSource, llamando a la API y delegando la transformación al Mapper.

## 3. Capa Application
- **Use Case**: Representa las intenciones del usuario, consumiendo el repositorio para ejecutar operaciones (ej. `RegisterStudentUseCase`).

## 4. DI Module (Inyección de Dependencias)
- Instancia y une validadores, mappers, repositorios y casos de uso, exportándolos para la aplicación React (ej. `StudentModule`).

## 5. Capa Presentation (UI)
- **View Model (Form Values)**: Estado intermedio y flexible de la UI (ej. `BaseStudentFormValues`).
- **Form Mapper**: Traduce el formato flexible de la UI al DTO estricto para casos de uso, y viceversa (ej. `StudentFormMapper`).

## 6. Integración Frontend (Custom Hooks)
- **Mutaciones/Queries**: Custom hooks (con TanStack Query) que interceptan la UI, usan `StudentFormMapper` para convertir a DTO y ejecutan el `UseCase`.
- **Mapeo Inverso**: Para actualizar registros, se obtiene la Entidad, se mapea al View Model (`BaseStudentFormValues`) y se inyecta en el formulario, evitando acoplamiento directo entre UI y Dominio.

## Árbol de Directorios


## Árbol de Directorios

```text
├── apps/                               <-- Aplicaciones consumibles
│   ├── admin-desk/                     <-- Portal administrativo
│   │   ├── public/
│   │   └── src/
│   │       ├── core/                   <-- Configuraciones, layouts y hooks globales
│   │       │   ├── adapters/
│   │       │   ├── components/
│   │       │   ├── config/
│   │       │   ├── data/
│   │       │   ├── hooks/
│   │       │   ├── interfaces/
│   │       │   ├── layouts/
│   │       │   └── pages/
│   │       └── features/               <-- Módulos visuales de la aplicación
│   │           ├── admin-desk/         <-- Features agrupados para admin-desk
│   │           │   ├── modules/
│   │           │   │   ├── application/
│   │           │   │   │   └── hooks/ (forms, use-cases)
│   │           │   │   └── presentation/ (components, pages)
│   │           │   ├── students/
│   │           │   │   ├── application/
│   │           │   │   └── presentation/ (components, interfaces, mappers, pages)
│   │           │   └── students-levels/
│   │           │       ├── application/
│   │           │       └── presentation/
│   │           ├── class-track/        <-- Features agrupados para class-track
│   │           └── shared/             <-- Features compartidos como autenticacion
│   │               └── identity/
│   │                   ├── application/ (hooks, store)
│   │                   └── presentation/ (components, interfaces, mappers, pages, routes)
│   ├── class-track-students/
│   │   ├── public/
│   │   └── src/
│   └── class-track-teacher/
│       ├── public/
│       └── src/
│
├── packages/                           <-- Código compartido agnóstico
│   ├── core/                           <-- Núcleo de Negocio (TypeScript puro)
│   │   └── src/
│   │       ├── adapters/               <-- Adaptadores genéricos (ej. Validator Adapter)
│   │       ├── config/                 <-- Variables de entorno y configuración general
│   │       ├── enums/                  <-- Enumeradores globales (ej. Códigos de error)
│   │       ├── interfaces/             <-- Interfaces globales (ej. Respuestas HTTP base)
│   │       ├── lib/                    <-- Envoltorios y utilidades base (ej. Cliente API)
│   │       ├── schemas/                <-- Esquemas de validación globales
│   │       ├── utils/                  <-- Funciones utilitarias puras (ej. regex, validadores)
│   │       └── features/               <-- Reglas de negocio divididas por módulos
│   │           ├── admin-desk/         <-- Lógica exclusiva de AdminDesk
│   │           │   ├── modules/
│   │           │   │   ├── application/
│   │           │   │   ├── di/
│   │           │   │   ├── domain/ (datasource, dtos, entities, repositories)
│   │           │   │   └── infrastructure/ (datasources, mapper, repositories, schemas)
│   │           │   ├── payments/
│   │           │   │   ├── application/
│   │           │   │   ├── di/
│   │           │   │   ├── domain/
│   │           │   │   └── infrastructure/
│   │           │   ├── students/
│   │           │   │   ├── application/
│   │           │   │   ├── di/
│   │           │   │   ├── domain/
│   │           │   │   └── infrastructure/
│   │           │   └── students-level/
│   │           │       ├── application/
│   │           │       ├── di/
│   │           │       ├── domain/
│   │           │       └── infrastructure/
│   │           ├── class-track-teachers/
│   │           │   └── attendance/
│   │           │       ├── application/
│   │           │       │   └── use-cases/      <-- Orquestadores de negocio (ej. RegisterStudentUseCase)
│   │           │       ├── di/                 <-- Inyección de Dependencias (une las capas)
│   │           │       ├── domain/             <-- Capa más interna, contratos puros
│   │           │       │   ├── datasources/    <-- Firmas abstractas para acceso a datos
│   │           │       │   ├── dtos/           <-- Data Transfer Objects (con validación propia)
│   │           │       │   ├── entities/       <-- Modelos de dominio puros
│   │           │       │   └── interfaces/     <-- Enums y tipos de las entidades
│   │           │       └── infrastructure/     <-- Capa de detalles técnicos (APIs)
│   │           │           ├── datasources/    <-- Implementación de peticiones HTTP
│   │           │           ├── mappers/        <-- Transforman Data cruda (JSON) -> Entities puras
│   │           │           ├── repositories/   <-- Puente: Implementa los domain datasources usando infra datasources
│   │           │           └── schemas/        <-- Esquemas locales de Zod para mapeo
│   │           └── shared/             <-- Lógica compartida entre aplicaciones
│   │               └── indentity/
│   │                   ├── application/
│   │                   ├── di/
│   │                   ├── domain/
│   │                   └── infrastructure/
│   └── ui/                             
│       └── lib/                        
```
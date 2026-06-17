# Estructura del Frontend SALC

A continuación se presenta la jerarquía de carpetas del monorepositorio, estructurada bajo los principios de **Clean Architecture**. Se ha omitido cualquier directorio de pruebas (`__test__`) para mantener la claridad.

## Árbol de Directorios

```text
├── apps/                               <-- Aplicaciones consumibles
│   ├── salc-portal/                    <-- Portal unificado (Admin Desk & Class Track)
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
│   │           │   │   └── presentation/
│   │           │   ├── students/
│   │           │   │   ├── application/
│   │           │   │   └── presentation/
│   │           │   └── students-levels/
│   │           │       ├── application/
│   │           │       └── presentation/
│   │           ├── class-track/        <-- Features agrupados para class-track
│   │           │   ├── core/
│   │           │   │   └── students/   <-- Lógica central y base para estudiantes
│   │           │   ├── dashboard/
│   │           │   │   ├── application/
│   │           │   │   └── presentation/
│   │           │   └── feats/          <-- Features específicas de class-track
│   │           │       ├── attendance/
│   │           │       └── retention-center/
│   │           └── shared/             <-- Features compartidos como autenticación
│   │               └── identity/
│   │                   ├── application/ (hooks, store)
│   │                   └── presentation/ (components, interfaces, mappers, pages, routes)
│   ├── class-track-students/           <-- Portal para estudiantes
│   │   ├── public/
│   │   └── src/
│   │       ├── core/                   <-- Configuraciones, layouts y hooks globales
│   │       └── features/               <-- Módulos visuales de la aplicación
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
│   │           │   ├── students/
│   │           │   └── students-level/
│   │           ├── class-track-teachers/ <-- Lógica exclusiva de Class Track
│   │           │   ├── attendance/
│   │           │   │   ├── application/
│   │           │   │   │   └── use-cases/      <-- Orquestadores de negocio
│   │           │   │   ├── di/                 <-- Inyección de Dependencias
│   │           │   │   ├── domain/             <-- Capa más interna, contratos puros
│   │           │   │   │   ├── datasources/    <-- Firmas abstractas para acceso a datos
│   │           │   │   │   ├── dtos/           <-- Data Transfer Objects
│   │           │   │   │   ├── entities/       <-- Modelos de dominio puros
│   │           │   │   │   └── interfaces/     <-- Enums y tipos
│   │           │   │   └── infrastructure/     <-- Capa de detalles técnicos (APIs)
│   │           │   │       ├── datasources/    <-- Implementación de peticiones HTTP
│   │           │   │       ├── mappers/        <-- Transforman cruda -> Entities
│   │           │   │       ├── repositories/   <-- Implementa domain datasources usando infra
│   │           │   │       └── schemas/        <-- Esquemas locales de Zod
│   │           │   ├── dashboard/
│   │           │   ├── retation-alert/
│   │           │   └── students/
│   │           └── shared/             <-- Lógica compartida entre aplicaciones
│   │               └── identity/
│   │                   ├── application/
│   │                   ├── di/
│   │                   ├── domain/
│   │                   └── infrastructure/
│   └── ui/                             <-- Sistema de Diseño SALC
│       └── lib/                        <-- Componentes atómicos y hooks visuales
```

## Descripción de Directorios y Capas

| Carpeta / Capa       | Propósito (Didáctica para Desarrolladores)                                                                                                | Responsabilidad Técnica (Semántica para IA)                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`apps/`**          | Las aplicaciones que ven los usuarios (ej. `salc-portal`). Contiene enrutamiento, vistas y estado visual. Todo el código de UI vive aquí. | **Presentation Layer / Delivery Mechanism**: Consumidores finales del Core. Implementan la UI con frameworks (React) e interactúan con los casos de uso. |
| **`packages/core/`** | El "cerebro" del sistema. Código TypeScript puro (sin React) que sabe cómo conectarse al backend y tiene las reglas del negocio.          | **Domain & Application Layers**: Módulos agnósticos. Expone las reglas empresariales (Entidades) y la orquestación (Use Cases).                          |
| **`packages/ui/`**   | Componentes visuales genéricos como Botones, Inputs o Tablas. Es la librería de diseño interno.                                           | **Shared UI Library**: Abstracción de UI base para unificar el Design System a lo largo del monorepositorio.                                             |
| **`Domain`**         | El núcleo del negocio. Estructuras de datos puras (Entidades) que no saben nada de bases de datos o APIs externas.                        | **Enterprise Business Rules**: Define contratos (Interfaces) e implementa Entidades/DTOs estables. Sin dependencias de terceros.                         |
| **`Application`**    | El coordinador. Define _qué_ hace el sistema agrupando la lógica de negocio y usándola paso a paso (Casos de uso).                        | **Application Business Rules (Use Cases)**: Orquesta las interacciones del Dominio con la Infraestructura para lograr un objetivo de negocio.            |
| **`Infrastructure`** | El traductor con el mundo exterior. Aquí adaptamos las APIs, manejamos fetch/axios y mapeamos los datos para que el dominio los entienda. | **Frameworks & Drivers**: Implementa los contratos del Dominio usando tecnologías específicas. Contiene Repositorios concretos, Mappers y llamadas HTTP. |
| **`Presentation`**   | (En apps) Componentes específicos de un módulo (ej. formulario de login). Muestran datos y detectan los clics del usuario.                | **Feature-Specific UI**: Componentes React que conectan el estado de la aplicación (Hooks/Stores) y delegan las acciones a la capa Application.          |

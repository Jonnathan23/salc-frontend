# Estructura del Frontend SALC

A continuación se presenta la jerarquía de carpetas del monorepositorio, estructurada bajo los principios de **Clean Architecture**. Se ha omitido cualquier directorio de pruebas (`__test__`) para mantener la claridad.

## Árbol de Directorios

```text
├── apps/                               <-- Aplicaciones consumibles
│   ├── admin-desk/                     <-- Portal administrativo
│   │   ├── public/
│   │   └── src/
│   │       ├── core/                   <-- Configuraciones, layouts y hooks globales de la app
│   │       │   ├── adapters/
│   │       │   ├── components/
│   │       │   ├── config/
│   │       │   ├── data/
│   │       │   ├── hooks/
│   │       │   ├── interfaces/
│   │       │   ├── layouts/
│   │       │   ├── pages/
│   │       │   └── routes/
│   │       └── features/               <-- Módulos visuales de la aplicación
│   │           ├── contracts/
│   │           ├── indentity/
│   │           │   ├── application/    <-- (Hooks y Stores locales)
│   │           │   └── presentation/   <-- (Componentes y Páginas)
│   │           ├── modules/
│   │           │   ├── application/
│   │           │   └── presentation/
│   │           └── students/
│   │               ├── application/
│   │               └── presentation/
│   ├── class-track-students/           <-- Aplicación para estudiantes
│   │   ├── public/
│   │   └── src/
│   └── class-track-teacher/            <-- Aplicación para docentes
│       ├── public/
│       └── src/
│
├── packages/                           <-- Código compartido agnóstico
│   ├── core/                           <-- Núcleo de Negocio (TypeScript puro)
│   │   └── src/
│   │       ├── adapters/               <-- Adaptadores genéricos (ej. Data Access Layer)
│   │       ├── config/                 <-- Variables de entorno y configuración
│   │       ├── enums/                  <-- Enumeradores globales
│   │       ├── interfaces/             <-- Interfaces globales
│   │       ├── lib/                    <-- Envoltorios y utilidades base
│   │       ├── schemas/                <-- Esquemas de validación globales
│   │       ├── utils/                  <-- Funciones utilitarias puras
│   │       └── features/               <-- Reglas de negocio divididas por módulos
│   │           ├── admin-desk/         <-- Lógica exclusiva de AdminDesk
│   │           │   ├── modules/
│   │           │   │   ├── application/<-- (Casos de uso)
│   │           │   │   ├── di/         <-- (Inyección de dependencias)
│   │           │   │   ├── domain/     <-- (Entidades, DTOs, interfaces de datasources)
│   │           │   │   └── infrastructure/ <-- (Repositorios, mappers, esquemas locales)
│   │           │   ├── payments/
│   │           │   │   ├── application/
│   │           │   │   ├── di/
│   │           │   │   ├── domain/
│   │           │   │   └── infrastructure/
│   │           │   └── students/
│   │           │       ├── application/
│   │           │       ├── di/
│   │           │       ├── domain/
│   │           │       └── infrastructure/
│   │           └── shared/             <-- Lógica compartida entre aplicaciones
│   │               └── indentity/
│   │                   ├── application/
│   │                   ├── di/
│   │                   ├── domain/
│   │                   └── infrastructure/
│   └── ui/                             <-- Sistema de Diseño SALC
│       └── lib/                        <-- Componentes atómicos y hooks visuales
```

## Descripción de Directorios y Capas

| Carpeta / Capa | Propósito (Didáctica para Desarrolladores) | Responsabilidad Técnica (Semántica para IA) |
|---------------|--------------------------------------------|---------------------------------------------|
| **`apps/`** | Las aplicaciones que ven los usuarios (ej. `admin-desk`). Contiene enrutamiento, vistas y estado visual. Todo el código de UI vive aquí. | **Presentation Layer / Delivery Mechanism**: Consumidores finales del Core. Implementan la UI con frameworks (React) e interactúan con los casos de uso. |
| **`packages/core/`** | El "cerebro" del sistema. Código TypeScript puro (sin React) que sabe cómo conectarse al backend y tiene las reglas del negocio. | **Domain & Application Layers**: Módulos agnósticos. Expone las reglas empresariales (Entidades) y la orquestación (Use Cases). |
| **`packages/ui/`** | Componentes visuales genéricos como Botones, Inputs o Tablas. Es la librería de diseño interno. | **Shared UI Library**: Abstracción de UI base para unificar el Design System a lo largo del monorepositorio. |
| **`Domain`** | El núcleo del negocio. Estructuras de datos puras (Entidades) que no saben nada de bases de datos o APIs externas. | **Enterprise Business Rules**: Define contratos (Interfaces) e implementa Entidades/DTOs estables. Sin dependencias de terceros. |
| **`Application`** | El coordinador. Define *qué* hace el sistema agrupando la lógica de negocio y usándola paso a paso (Casos de uso). | **Application Business Rules (Use Cases)**: Orquesta las interacciones del Dominio con la Infraestructura para lograr un objetivo de negocio. |
| **`Infrastructure`** | El traductor con el mundo exterior. Aquí adaptamos las APIs, manejamos fetch/axios y mapeamos los datos para que el dominio los entienda. | **Frameworks & Drivers**: Implementa los contratos del Dominio usando tecnologías específicas. Contiene Repositorios concretos, Mappers y llamadas HTTP. |
| **`Presentation`** | (En apps) Componentes específicos de un módulo (ej. formulario de login). Muestran datos y detectan los clics del usuario. | **Feature-Specific UI**: Componentes React que conectan el estado de la aplicación (Hooks/Stores) y delegan las acciones a la capa Application. |
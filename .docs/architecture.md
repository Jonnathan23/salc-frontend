# Frontend Architecture & Workflow

## Resumen
Este documento define las directrices arquitectónicas, la separación de capas y el flujo de trabajo del monorepo del frontend. El proyecto sigue estrictamente la **Clean Architecture** para separar la capa de presentación (UI) de la lógica de negocio y la infraestructura, lo que garantiza la escalabilidad, la facilidad de prueba y la independencia del marco de trabajo para las reglas básicas.

## Diccionario de Responsabilidades

| Capa / Módulo             | Descripción                                                                 |
|---------------------------|--------------------------------------------------------------------------------------|
| **Apps (Admin/Class)**    | Contienen la lógica de presentación específica. Son "consumidores" de la lógica de negocio centralizada. Proveen las interfaces de usuario construidas con React. |
| **Business Logic / Domain**| Capa agnóstica al framework (`packages/core`). Contiene los casos de uso, entidades y validaciones que no dependen de React para asegurar portabilidad y limpieza. |
| **Shared Services & UI**  | Implementaciones de comunicación HTTP (adapters), mappers compartidos y componentes UI reutilizables entre todas las aplicaciones del monorepo (`packages/ui` y `packages/core`). |

---

## Capas del Cliente (Apps)

Cada aplicación dentro de `apps/` (ej. `admin-desk`, `class-track`) es un consumidor de la lógica de negocio. La estructura interna separa las responsabilidades globales de las modulares (por funcionalidad).

### 1. Directorio Global (`src/core/`)
Contiene los elementos transversales de la aplicación:
- **`components/` & `layouts/`**: Componentes de interfaz estáticos o globales (ej. Sidebar, Navbar, Layouts).
- **`hooks/`**: Custom hooks globales que no pertenecen a una funcionalidad específica del negocio.
- **`routes/` & `pages/`**: Configuración de enrutamiento y páginas de acceso global.
### 2. Directorio de Funcionalidades (`src/features/[feature-name]/`)

Cada funcionalidad de negocio (ej. `modules`, `students`) agrupa su propia presentación y estado local, conectándose con la capa de dominio.

#### Capa de Aplicación UI (`application/`)

| Componente              | Descripción para Desarrolladores                                                                                                     | Descripción para IA                                                                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`hooks/` (TanStack Query)** | **Desarrolladores:** Maneja el estado asíncrono (carga, error, éxito) al solicitar o enviar datos al servidor. Utiliza hooks de React Query para optimizar el rendimiento de la UI y re-renderizar componentes automáticamente. | **IA:** Contiene hooks personalizados que implementan `useQuery` y `useMutation` de TanStack Query. Estos encapsulan las llamadas a los **Use Cases** inyectados desde el Core, gestionando la caché del servidor, invalidación de queries y propagación de errores (`CustomError`) hacia la UI. **Regla:** Los componentes nunca llaman directamente a los Use Cases; siempre consumen estos hooks. |
| **`store/` (Zustand)** | **Desarrolladores:** Almacena datos que necesitan ser accesibles en múltiples pantallas, como la información del usuario autenticado, evitando el paso de datos entre componentes. | **IA:** Implementación de estado global del lado del cliente utilizando **Zustand**. Se utiliza para gestionar estado efímero o persistente que no depende de la caché del servidor (ej. sesión de usuario en `auth.store.ts`). |

#### Capa de Presentación (`presentation/`)

| Componente              | Descripción para Desarrolladores                                                                                                     | Descripción para IA                                                                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`components/`**      | **Desarrolladores:** Bloques visuales de la interfaz (formularios, tablas, tarjetas).                                                | **IA:** Componentes React aislados (también conocidos como "Dumb" o "Smart" components). Deben delegar la lógica de negocio compleja y las llamadas HTTP a los hooks de `application/`. |
| **`pages/`**           | **Desarrolladores:** Pantallas completas que los usuarios visitan.                                                                    | **IA:** Componentes contenedores que ensamblan la vista, manejan los parámetros de ruta y orquestan los componentes específicos de la funcionalidad.                                    |

---

## Lógica de Negocio Centralizada (`packages/core/src/`)

La capa base (`@salc/core`) es completamente agnóstica de la interfaz gráfica. Su diseño permite que cualquier framework de UI pueda consumir la misma lógica.

### 1. Domain Layer (`domain/`)
El corazón del sistema. No tiene dependencias externas.
- **Entities:** Clases puras de TypeScript que modelan la información del negocio.
- **DTOs (Data Transfer Objects):** 
  - Validan los datos de entrada usando el patrón `Interface + Impl Class` con un factory method `create()`.
  - Lanzan `CustomError.badRequest()` si falla la validación antes de contactar al backend.
- **DataSources:** Contratos (clases abstractas o interfaces) que definen las operaciones requeridas.

### 2. Infrastructure Layer (`infrastructure/`)
Responsable de la comunicación externa (HTTP) y transformación de datos.
- **Repositories:** Implementan los `DataSources`. Utilizan el cliente HTTP configurado (`api`) para realizar peticiones.
- **Mappers & Schemas:** 
  - Los esquemas de **Zod** validan que la respuesta JSON del servidor sea la esperada.
  - Los **Mappers** transforman esta respuesta cruda (Data Access Layer) hacia **Entities** puras del dominio.

### 3. Application Layer (Core) (`application/use-cases/`)
El orquestador de reglas de negocio.
- **Use Cases:** Implementan el patrón **Command** (con un único método `execute`). Reciben DTOs, llaman a los Repositories y retornan objetos predecibles (`Promise<SuccessResponse<Entity>>`).

### 4. Dependency Injection (`di/`)
- Cada funcionalidad en el Core posee un archivo `[FeatureName]Module.ts`.
- Este archivo actúa como contenedor IoC (Inversion of Control), instanciando los Repositories (con la configuración HTTP) y pasándolos a los Use Cases.
- **Restricción Crítica:** La capa de React (en `apps/`) **sólo** debe importar los Use Cases ya instanciados desde esta carpeta `di/`. Nunca instanciar clases del dominio o repositorios directamente en la UI.

---

## Flujo de Datos Transversal (Ejemplo de Mutación)

```typescript
// Ejemplo estructural usando el estilo Kernighan y Ritchie (K&R)
```

1. **UI Level (Presentación):** El usuario interactúa con un formulario en `apps/admin-desk/src/features/modules/presentation/components/ModuleForm.tsx`.
2. **UI Hook (TanStack Query):** El componente llama a la función `mutate()` expuesta por el hook `useCreateModule.use.ts`.
3. **DTO Validation:** El hook recibe la información cruda y llama a `CreateModuleDtoImpl.create(rawData)`. Si es inválida, se lanza un `CustomError` que es capturado por React Query.
4. **Use Case (Core):** Si el DTO es válido, el hook invoca `createModuleUseCase.execute(validDto)`.
5. **Repository (Infrastructure):** El Use Case delega la operación al Repository, el cual ejecuta la llamada HTTP.
6. **Mapper:** La respuesta del servidor es validada por Zod y mapeada a una Entidad de Dominio.
7. **Resolución:** El Use Case devuelve la Entidad envuelta en un SuccessResponse. React Query actualiza su estado interno, ejecuta invalidación de cachés vinculadas (ej. `queryClient.invalidateQueries({ queryKey: ["modules"] })`) y la UI refleja el nuevo estado.

---

## Manejo de Errores

* **Nunca** lanzar objetos genéricos `Error`.
* Utilizar siempre instancias de `CustomError` (ej. `CustomError.badRequest('Mensaje claro')`, `CustomError.notFound()`).
* Las excepciones de red (4xx/5xx) son interceptadas automáticamente por la instancia centralizada `api` y convertidas en `CustomError`.
* React Query captura estos errores arrojados desde el Core y los expone al componente de presentación para notificar al usuario (ej. a través de tostadas o alertas, como `ShowMessageAdapter.error()`).
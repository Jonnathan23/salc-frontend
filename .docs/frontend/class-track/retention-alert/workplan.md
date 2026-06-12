# Workplan Frontend: Centro de Retención (Retention Alerts)

## 1. Entidades y Modelos (Packages Core)

En `packages/core/src/features/class-track/retention-alerts/domain/`:

- **`RetentionAlertEntity`:** Interfaz pura de dominio.
- **`RetentionAlertStudentProfile`:** Sub-entidad o tipo para la información del estudiante anidada.
- **`UpdateRetentionAlertDto`:** Estructura estricta para el envío de datos al backend al guardar el modal.

## 2. Infrastructure y Mapeo

En `packages/core/src/features/class-track/retention-alerts/infrastructure/`:

- **Schemas (Zod):** `retentionAlertSchema` y `updateRetentionAlertSchema` para validar la respuesta del endpoint y el body a enviar.
- **Mappers:**
    - `RetentionAlertMapper.toEntity()`: Transforma el JSON del backend (`RetentionAlertWithStudentProjection`) a la entidad `RetentionAlertEntity`.
- **DataSource / Repository:** Implementación de las llamadas HTTP:
    - `getAlerts(status?: string)` -> Hace el GET a `/class-track/retention-alerts`.
    - `updateAlert(id: string, dto: UpdateRetentionAlertDto)` -> Hace el PATCH a `class-track/retention-alerts/:id`.

## 3. Casos de Uso (Application)

En `packages/core/src/features/class-track/retention-alerts/application/use-cases/`:

- `GetRetentionAlertsUseCase`: Ejecuta la consulta y retorna las entidades para listar.
- `UpdateRetentionAlertUseCase`: Ejecuta la actualización pasándole el DTO estructurado.

## 4. UI y Gestión de Estado (salc-portal)

En `apps/salc-portal/src/features/class-track/feats/retention-center/`:

### 4.1 View Models & Form Mappers

- **View Model:** `RetentionAlertFormValues` para manejar el estado del modal de edición:
    ```typescript
    {
        contactDate: string; // formato YYYY-MM-DD
        hasResponded: boolean;
        isJustified: boolean;
        justificationReason: string;
        returnDeadline: string; // formato YYYY-MM-DD
    }
    ```
- **Form Mapper:** Convierte el `RetentionAlertFormValues` local en el `UpdateRetentionAlertDto` que requiere el caso de uso (transformando strings a Date).

### 4.2 Custom Hooks (TanStack Query)

- **`RetetionAlertsActives`:**
    - Consume `GetRetentionAlertsUseCase`.
    - Opcionalmente puede recibir el filtro de estado (pendientes vs resueltas).
- **`useUpdateRetentionAlert`:**
    - Consume `UpdateRetentionAlertUseCase`.
    - Al completar exitosamente (onSuccess), debe invalidar la query de `getRetentionAlerts` para refrescar las tablas y cerrar el modal.

### 4.3 Refactorización de la Vista (`RetentionCenterView.tsx`)

- Eliminar `mockAlerts` y `mockStudents`.
- Reemplazar el estado local `alerts` por la data proveniente de `RetetionAlertsActives`.
- Reemplazar la función local `handleSave` por la llamada a la mutación de `useUpdateRetentionAlert`, pasándole el `FormMapper` con el estado del `editForm`.
- Implementar estados de "Cargando" y "Error" para las tablas mientras los datos se recuperan de la API.

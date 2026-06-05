export default function ClassTrackSkeleton() {
    //TODO: Crear un Skeleton basado en ClassTrackLayout
    return (
        <div className="w-full p-4 space-y-4 animate-pulse">
            {/* Header simulado */}
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            
            {/* Barra de herramientas simulada */}
            <div className="flex justify-between">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Tabla simulada (filas) */}
            <div className="space-y-3 mt-6">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
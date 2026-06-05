export default function ClassTrackSkeleton() {
    return (
        <div className="w-full p-4 space-y-4 animate-pulse">
            {/* Header simulado */}
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            
            {/* Grid simulado (3 tarjetas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
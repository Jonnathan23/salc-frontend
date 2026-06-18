import { Card, CardContent, CardFooter, CardHeader } from "@/core/components/ui/Card";
import { Skeleton } from "@/core/components/ui/Skeleton";

interface CardGridSkeletonProps {
    readonly itemsCount?: number;
    readonly showFooter?: boolean;
}

export function CardGridSkeleton({ itemsCount = 4, showFooter = true }: CardGridSkeletonProps) {
    return (
        <>
            {Array.from({ length: itemsCount }).map((_, index) => (
                <Card key={index} className="group flex h-full flex-col transition-all">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3 border-b">
                        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-4 space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                    {showFooter && (
                        <CardFooter className="flex justify-end gap-2 pt-4 border-t mt-auto">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                        </CardFooter>
                    )}
                </Card>
            ))}
        </>
    );
}

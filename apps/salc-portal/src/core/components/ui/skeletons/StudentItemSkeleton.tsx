import { Skeleton } from "@/core/components/ui/Skeleton";

interface StudentItemSkeletonProps {
    readonly numbersRows?: number;
    readonly background?: string;
}

export function StudentItemSkeleton({ numbersRows = 5, background = "bg-primary" }: StudentItemSkeletonProps) {
    return (
        <>
            {Array.from({ length: numbersRows }).map((_, index) => (
                <tr key={index} className="hover:bg-primary/5 transition-colors">
                    <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" background={background} />
                            <Skeleton className="h-4 w-32" background={background} />
                        </div>
                    </td>
                    <td className="px-5 py-3">
                        <Skeleton className="h-4 w-24" background={background} />
                    </td>
                    <td className="px-5 py-3">
                        <Skeleton className="h-4 w-20" background={background} />
                    </td>
                    <td className="px-5 py-3">
                        <Skeleton className="h-6 w-20 rounded-full" background={background} />
                    </td>
                    <td className="px-5 py-3">
                        <Skeleton className="h-6 w-24 rounded-full" background={background} />
                    </td>
                </tr>
            ))}
        </>
    );
}

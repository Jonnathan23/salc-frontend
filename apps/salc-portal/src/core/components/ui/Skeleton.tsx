import { cn } from "@salc/ui/lib/utils";

function Skeleton({ className, background = "bg-primary", ...props }: React.ComponentProps<"div"> & { background?: string }) {
    return <div data-slot="Skeleton" className={cn(`${background} animate-pulse rounded-md`, className)} {...props} />;
}

export { Skeleton };

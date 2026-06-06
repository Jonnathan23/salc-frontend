import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@salc/ui/lib/utils";
import { buttonVariants } from "@/core/components/ui/buttonVariants";

export function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"Button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "Button";

    return <Comp data-slot="Button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

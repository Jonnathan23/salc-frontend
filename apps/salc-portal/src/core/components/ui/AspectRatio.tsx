"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-AspectRatio";

function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
    return <AspectRatioPrimitive.Root data-slot="AspectRatio" {...props} />;
}

export { AspectRatio };

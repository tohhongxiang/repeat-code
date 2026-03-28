import { Loader2 } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export default forwardRef<SVGSVGElement, LucideProps>(function LoadingIndicator(
	{ className, ...props },
	ref,
) {
	return (
		<Loader2
			ref={ref}
			{...props}
			className={cn("animate-spin", className)}
		/>
	);
});

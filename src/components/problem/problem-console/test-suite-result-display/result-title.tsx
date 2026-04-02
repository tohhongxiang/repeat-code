import { cn } from "@/lib/utils";

interface ResultTitleProps extends React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
> {
	variant: "success" | "error";
}

export default function ResultTitle({
	children,
	variant,
	...props
}: ResultTitleProps) {
	return (
		<p
			{...props}
			className={cn(
				"text-lg font-semibold",
				variant === "success" && "text-emerald-400",
				variant === "error" && "text-destructive",
				props.className,
			)}
		>
			{children}
		</p>
	);
}

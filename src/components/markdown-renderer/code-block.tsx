import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function CodeBlock(props: React.ComponentProps<"pre">) {
	const preRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		const text = preRef.current?.textContent ?? "";
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, []);

	return (
		<div className="group relative">
			<pre ref={preRef} {...props} />
			<button
				onClick={handleCopy}
				className="absolute top-2 right-2 cursor-pointer rounded-md border border-transparent p-1.5 opacity-0 transition-all group-hover:border-border group-hover:bg-background/80 group-hover:opacity-100 group-hover:backdrop-blur-sm"
				aria-label="Copy code"
			>
				{copied ? (
					<Check className="size-4 text-green-500" />
				) : (
					<Copy className="size-4 text-muted-foreground" />
				)}
			</button>
		</div>
	);
}

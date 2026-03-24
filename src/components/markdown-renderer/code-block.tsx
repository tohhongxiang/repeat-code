import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "../ui/button";

export default function CodeBlock(props: React.ComponentProps<"pre">) {
	const preRef = useRef<HTMLPreElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		const text = preRef.current?.textContent ?? "";

		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);

			// cancel previous timer
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// start new timer
			timeoutRef.current = setTimeout(() => {
				setCopied(false);
			}, 2000);
		});
	}, []);

	return (
		<div className="group relative">
			<pre ref={preRef} {...props} />
			<Button
				onClick={handleCopy}
				className="absolute top-2 right-2 cursor-pointer rounded-md border border-transparent p-1.5 opacity-40 transition-all hover:opacity-90 hover:backdrop-blur-sm focus-visible:opacity-100"
				aria-label="Copy"
				variant="ghost"
				size="icon"
			>
				{copied ? (
					<Check className="size-4 text-foreground" />
				) : (
					<Copy className="size-4 text-foreground" />
				)}
			</Button>
		</div>
	);
}

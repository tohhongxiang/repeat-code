import { CircleSlash } from "lucide-react";

export default function TestSuiteResultDisplayEmpty() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8">
			<CircleSlash className="size-12" />
			<p className="text-muted-foreground">Run your code first!</p>
		</div>
	);
}

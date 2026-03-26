import { Link } from "@tanstack/react-router";
import { CircleX } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type ErrorDisplayProps = {
	error: Error;
};

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
	const [showDetails, setShowDetails] = useState(false);
	return (
		<div className="mx-auto flex max-w-prose flex-col items-center justify-start gap-8 rounded-md px-8 py-32 text-sm">
			<CircleX className="size-32 text-muted-foreground" />
			<p className="text-xl font-medium text-destructive">
				Error: {error.message}
			</p>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex flex-row items-center justify-center gap-4">
					<Link to="/">
						<Button size="lg">Back to Homepage</Button>
					</Link>
					<Button
						size="lg"
						variant="destructive"
						onClick={() => setShowDetails((c) => !c)}
					>
						{showDetails ? "Hide details" : "View details"}
					</Button>
				</div>
				{showDetails && (
					<pre className="rounded-md border p-4 text-muted-foreground">
						{error.stack}
					</pre>
				)}
			</div>
		</div>
	);
}

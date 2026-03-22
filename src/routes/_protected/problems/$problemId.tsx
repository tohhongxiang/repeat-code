import { createFileRoute } from "@tanstack/react-router";

import ProblemLayout from "@/components/problem";

export const Route = createFileRoute("/_protected/problems/$problemId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProblemLayout />;
}

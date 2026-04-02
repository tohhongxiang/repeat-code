import { useQuery } from "@tanstack/react-query";

import getProblem from "@/lib/problem/get-problem";
import type { Problem } from "@/lib/problem/types";

export default function useProblemQuery(problemID: Problem["id"]) {
	const problemQuery = useQuery({
		queryKey: ["problem", problemID],
		queryFn: () => getProblem(problemID),
	});

	return problemQuery;
}

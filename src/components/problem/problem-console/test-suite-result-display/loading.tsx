import { Skeleton } from "@/components/ui/skeleton";

export default function TestSuiteResultDisplayLoading() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="h-8 w-40" />
			<Skeleton className="h-6 w-full" />
			<Skeleton className="h-6 w-full" />
			<Skeleton className="h-6 w-full" />
			<Skeleton className="h-6 w-full" />
		</div>
	);
}

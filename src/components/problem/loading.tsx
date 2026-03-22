import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex h-full min-h-0 flex-1 flex-row gap-2 p-4 pt-0">
			<div className="flex max-w-prose flex-1 flex-col gap-4 px-2 py-4">
				<Skeleton className="mb-4 h-12 w-full" />

				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="mb-4 h-6 w-full" />

				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="mb-4 h-6 w-full" />

				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="mb-4 h-6 w-full" />

				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="flex flex-1 flex-col gap-4 px-2 py-4">
				<div className="min-h-0 flex-1">
					<Skeleton className="h-full w-full" />
				</div>
				<div className="flex flex-col gap-4">
					<Skeleton className="h-6 w-64" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
			</div>
		</div>
	);
}

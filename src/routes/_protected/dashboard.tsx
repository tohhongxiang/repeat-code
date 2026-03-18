import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard")({
	component: RouteComponent,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			This is the dashboard for {user.name}
		</div>
	);
}

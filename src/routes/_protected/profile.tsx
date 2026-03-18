import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";

export const Route = createFileRoute("/_protected/profile")({
	component: RouteComponent,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			{user.image && (
				<img src={user.image} className="h-32 w-32 rounded-full" />
			)}
			<p>{user.id}</p>
			<p>{user.name}</p>
			<p>{user.email}</p>
			<Button
				onClick={() =>
					signOut({}, { onSuccess: () => navigate({ to: "/" }) })
				}
			>
				Sign Out
			</Button>
		</div>
	);
}

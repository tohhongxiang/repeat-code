import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "@/lib/auth/client";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const { data: session } = useSession();
	return (
		<main className="flex flex-col items-center justify-center gap-4 px-8 py-4">
			<p className="text-3xl font-semibold">Hello</p>
			<div className="flex flex-col items-center justify-center gap-2">
				{!session && (
					<Button
						onClick={() => signIn.social({ provider: "github" })}
					>
						Sign in with Github
					</Button>
				)}
				{session && (
					<>
						<p>Client signed in as {session.user.name}</p>
						<Link to="/dashboard">Dashboard</Link>
						<Button onClick={() => signOut()}>Sign out</Button>
					</>
				)}
			</div>
		</main>
	);
}

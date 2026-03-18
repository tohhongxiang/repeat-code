import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/lib/auth";

export const { useSession, signIn, signOut, signUp, getSession } =
	createAuthClient({
		baseURL: process.env.BETTER_AUTH_URL,
		redirectTo: "/login",
		plugins: [inferAdditionalFields<typeof auth>()],
	});

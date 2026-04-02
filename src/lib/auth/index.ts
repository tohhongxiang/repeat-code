import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "@/db/drizzle";

export const auth = betterAuth({
	socialProviders: {
		github: {
			clientId: process.env?.["GITHUB_CLIENT_ID"] ?? "",
			clientSecret: process.env?.["GITHUB_CLIENT_SECRET"],
		},
	},
	database: drizzleAdapter(db, { provider: "pg" }),
	plugins: [tanstackStartCookies()],
	user: {
		additionalFields: {
			admin: {
				type: "boolean",
				input: false,
			},
		},
	},
});

import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryClientProvider from "@/lib/query-client/provider";
import ThemeProvider from "@/lib/theme/provider";
import { getThemeServerFn } from "@/lib/theme/utils";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Repeat Code",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
			},
		],
	}),
	loader: () => getThemeServerFn(),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const theme = Route.useLoaderData();
	return (
		<html className={theme} lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex h-screen flex-col font-sans antialiased">
				<QueryClientProvider>
					<ThemeProvider theme={theme}>
						<TooltipProvider>
							<Header />
							<main className="min-h-0 flex-1">{children}</main>
						</TooltipProvider>
					</ThemeProvider>
				</QueryClientProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

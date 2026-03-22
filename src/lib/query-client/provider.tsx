import {
	QueryClient,
	QueryClientProvider as TanstackReactQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TanstackReactQueryClientProvider client={queryClient}>
			{children}
		</TanstackReactQueryClientProvider>
	);
}

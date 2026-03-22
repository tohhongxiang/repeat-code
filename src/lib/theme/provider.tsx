import { useRouter } from "@tanstack/react-router";
import { createContext, use } from "react";
import type { PropsWithChildren } from "react";

import type { T as Theme } from "@/lib/theme/utils";
import { setThemeServerFn } from "@/lib/theme/utils";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export default function ThemeProvider({ children, theme }: Props) {
	const router = useRouter();

	function setTheme(val: Theme) {
		setThemeServerFn({ data: val }).then(() => router.invalidate());
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	const val = use(ThemeContext);
	if (!val) throw new Error("useTheme called outside of ThemeProvider!");
	return val;
}

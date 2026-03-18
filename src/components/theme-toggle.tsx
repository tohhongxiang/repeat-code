import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

import { Button } from "./ui/button";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			{theme === "dark" ? <Moon /> : <Sun />}
		</Button>
	);
}

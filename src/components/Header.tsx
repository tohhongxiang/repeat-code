import { Link } from "@tanstack/react-router";

import ThemeToggle from "./theme-toggle";

export default function Header() {
	return (
		<nav className="mx-auto flex flex-row justify-between px-8 py-4">
			<Link to="/">
				<h2>RepeatCode</h2>
			</Link>
			<div className="flex flex-row items-center justify-center gap-4">
				<Link to="/about">
					<p>About</p>
				</Link>
				<Link to="/about">
					<p>Page 1</p>
				</Link>
				<Link to="/about">
					<p>Page 2</p>
				</Link>
			</div>
			<ThemeToggle />
		</nav>
	);
}

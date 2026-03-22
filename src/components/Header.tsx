import { Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, LayoutDashboard, LogOut } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth/client";

import ThemeToggle from "./theme-toggle";

export default function Header() {
	const { data } = useSession();

	const navigate = useNavigate();
	const handleLogOut = () => {
		signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: "/" });
				},
			},
		});
	};

	return (
		<nav className="mx-auto flex w-full flex-row items-center justify-between px-8 py-4">
			<Link to="/">
				<h2>RepeatCode</h2>
			</Link>
			<div className="flex flex-row items-center justify-center gap-4">
				<Link to="/about">
					<p>About</p>
				</Link>
				{data?.user && (
					<>
						<Link to="/dashboard">
							<p>Dashboard</p>
						</Link>
						<Link to="/problems">
							<p>Problems</p>
						</Link>
					</>
				)}
			</div>
			<div className="flex flex-row items-center justify-center gap-2">
				{data?.user ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer">
							<Avatar>
								<img src={data.user.image ?? ""} />
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuGroup>
								<DropdownMenuLabel className="p-1 font-normal">
									<div className="flex flex-row items-center justify-start gap-2">
										<Avatar>
											<img src={data.user.image ?? ""} />
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<p className="truncate text-xs font-medium">
												{data.user.name}
											</p>
											<p className="truncate text-xs text-muted-foreground">
												{data.user.email}
											</p>
										</div>
									</div>
								</DropdownMenuLabel>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<Link to="/dashboard">
									<DropdownMenuItem>
										<LayoutDashboard />
										Dashboard
									</DropdownMenuItem>
								</Link>
								<Link to="/profile">
									<DropdownMenuItem>
										<BadgeCheck />
										Profile
									</DropdownMenuItem>
								</Link>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleLogOut}
								variant="destructive"
							>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex flex-row items-center justify-center gap-2">
						<Button>
							<Link to="/login">Login</Link>
						</Button>
					</div>
				)}
				<ThemeToggle />
			</div>
		</nav>
	);
}

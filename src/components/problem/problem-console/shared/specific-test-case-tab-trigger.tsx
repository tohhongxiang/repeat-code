import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SpecificTestCaseTabTriggerProps {
	index: number;
	isActive?: boolean;
	deleteEnabled?: boolean;
	onDelete?: () => void;
	iconBefore?: LucideIcon;
}

export default function SpecficTestCaseTabTrigger({
	index,
	isActive,
	deleteEnabled,
	onDelete,
	iconBefore: IconBefore,
}: SpecificTestCaseTabTriggerProps) {
	return (
		<div className="group relative inline-flex">
			<TabsTrigger
				value={index}
				className={cn(
					"tab-trigger px-4 py-1",
					"group-focus-within:border group-focus-within:border-border group-focus-within:text-foreground group-hover:border group-hover:border-border group-hover:text-foreground",
					"dark:group-focus-within:bg-accent dark:group-hover:bg-accent dark:data-active:bg-accent",
				)}
			>
				{IconBefore && <IconBefore />}
				<span>Case {index + 1}</span>
			</TabsTrigger>
			<Button
				size="icon-xs"
				variant="destructive"
				type="button"
				className={cn(
					"absolute -top-2 -right-2 size-5 rounded-full border p-px opacity-0 transition-opacity duration-75 group-focus-within:opacity-100 group-hover:opacity-100",
					isActive && "opacity-100",
					!deleteEnabled && "hidden",
				)}
				onClick={onDelete}
			>
				<X className="size-3 stroke-3" />
				<span className="sr-only">Delete test case {index + 1}</span>
			</Button>
		</div>
	);
}

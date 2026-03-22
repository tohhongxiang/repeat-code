import { DIFFICULTIES } from "@/lib/problem/types";
import { cn } from "@/lib/utils";

const config = {
	[DIFFICULTIES.EASY]: {
		backgroundClassNames:
			"border-emerald-300 bg-emerald-300/20 dark:bg-emerald-400/10 dark:border-emerald-400/20",
		textClassNames: "text-green-700 dark:text-emerald-400",
		label: "Easy",
	},
	[DIFFICULTIES.MEDIUM]: {
		backgroundClassNames:
			"border-amber-300 bg-amber-300/20 dark:bg-amber-400/10 dark:border-amber-400/20",
		textClassNames: "text-amber-700 dark:text-amber-400",
		label: "Medium",
	},
	[DIFFICULTIES.HARD]: {
		backgroundClassNames:
			"border-red-300 bg-red-300/20 dark:bg-red-400/10 dark:border-red-400/20",
		textClassNames: "text-red-700 dark:text-red-400",
		label: "Hard",
	},
} as const;

export default function DifficultyBadge({
	difficulty,
}: {
	difficulty: (typeof DIFFICULTIES)[keyof typeof DIFFICULTIES];
}) {
	const currentDifficultyConfig = config[difficulty];
	if (!currentDifficultyConfig) {
		return null;
	}

	const { backgroundClassNames, textClassNames, label } =
		currentDifficultyConfig;

	return (
		<div
			className={cn(
				"inline-flex w-fit items-center justify-center rounded-full border px-4 pb-0.5",
				backgroundClassNames,
			)}
		>
			<p className={cn("inline text-sm font-medium", textClassNames)}>
				{label}
			</p>
		</div>
	);
}

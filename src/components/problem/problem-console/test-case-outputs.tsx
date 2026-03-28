import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TestCaseOutputsProps {
	testCases: Array<{
		inputs: Array<{ name: string; value: string }>;
		output?: string;
	}>;
}

export default function TestCaseOutputs({ testCases }: TestCaseOutputsProps) {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	return (
		<Tabs value={activeTabIndex} onValueChange={setActiveTabIndex}>
			<div className="flex flex-row items-center justify-start gap-2">
				<TabsList className="gap-4 bg-transparent group-data-horizontal/tabs:h-10">
					{testCases.map((_, testCaseIndex) => (
						<div
							key={testCaseIndex}
							className="group relative inline-flex"
						>
							<TabsTrigger
								value={testCaseIndex}
								className={cn(
									"tab-trigger px-4 py-1",
									"group-focus-within:border group-focus-within:border-border group-focus-within:text-foreground group-hover:border group-hover:border-border group-hover:text-foreground",
									"dark:group-focus-within:bg-accent dark:group-hover:bg-accent dark:data-active:bg-accent",
								)}
							>
								Case {testCaseIndex + 1}
							</TabsTrigger>
						</div>
					))}
				</TabsList>
			</div>
			{testCases.map((testCase, testCaseIndex) => (
				<TabsContent
					key={testCaseIndex}
					value={testCaseIndex}
					tabIndex={-1}
					className="flex flex-col gap-4"
				>
					{testCase.inputs.map(({ name, value }) => (
						<div
							key={name}
							className="rounded-lg border border-input px-4 py-2 font-mono dark:bg-input/30"
						>
							<p className="text-muted-foreground">{name} =</p>
							<p>{value}</p>
						</div>
					))}
				</TabsContent>
			))}
		</Tabs>
	);
}

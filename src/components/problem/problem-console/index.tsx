import { SquareCheck, Terminal } from "lucide-react";

import LoadingIndicator from "@/components/loading-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type useProblemRunner from "../hooks/use-problem-runner";
import type useProblemConsoleState from "./hooks/use-problem-console-state";
import TestCaseEditor from "./test-case-editor";
import type useTestCaseEditor from "./test-case-editor/use-problem-test-case-editor";
import TestSuiteResultDisplay from "./test-suite-result-display";

interface ProblemConsoleProps {
	consoleState: ReturnType<typeof useProblemConsoleState>;
	testCaseEditor: ReturnType<typeof useTestCaseEditor>;
	problemRunner: ReturnType<typeof useProblemRunner>;
}

export default function ProblemConsole({
	consoleState,
	testCaseEditor,
	problemRunner,
}: ProblemConsoleProps) {
	return (
		<Tabs
			value={consoleState.currentTab}
			onValueChange={consoleState.setCurrentTab}
			className="flex max-h-100 min-h-0 flex-col"
		>
			<TabsList variant="line" className="flex-1 shrink-0">
				<TabsTrigger value={consoleState.tabs.TEST_CASE_EDITOR}>
					<SquareCheck />
					Test Cases
				</TabsTrigger>
				<TabsTrigger value={consoleState.tabs.OUTPUT}>
					{problemRunner.isRunning ? (
						<LoadingIndicator />
					) : (
						<Terminal />
					)}
					Output
				</TabsTrigger>
			</TabsList>
			<ScrollArea>
				<div className="px-1 py-2">
					<TabsContent value={consoleState.tabs.TEST_CASE_EDITOR}>
						<TestCaseEditor editor={testCaseEditor} />
					</TabsContent>
					<TabsContent value={consoleState.tabs.OUTPUT}>
						{problemRunner.isRunning ? (
							<TestSuiteResultDisplay.Loading />
						) : !problemRunner.result ? (
							<TestSuiteResultDisplay.Empty />
						) : (
							<TestSuiteResultDisplay {...problemRunner.result} />
						)}
					</TabsContent>
				</div>
			</ScrollArea>
		</Tabs>
	);
}

import { SquareCheck, Terminal } from "lucide-react";
import { useState } from "react";

import LoadingIndicator from "@/components/loading-indicator";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TestCaseEditor from "./test-case-editor";
import TestCaseOutputs from "./test-case-outputs";
import type { TestCase } from "./types";
import useTestCaseEditor from "./use-test-case-editor";

interface ProblemConsoleProps {
	initialTestCases: Array<TestCase>;
	onRun: (testCases: Array<TestCase>) => Promise<void>;
	onSubmit: () => Promise<void>;
}

export default function ProblemConsole({
	initialTestCases,
	onRun,
	onSubmit,
}: ProblemConsoleProps) {
	const testCaseEditor = useTestCaseEditor({ initialTestCases });

	const [isRunning, setIsRunning] = useState(false);

	const handleRun = async () => {
		const isValid = await testCaseEditor.validate();
		if (!isValid) {
			return;
		}

		const testCases = testCaseEditor.form.getValues().testCases;
		setIsRunning(true);
		await onRun(testCases);
		setIsRunning(false);
	};

	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSubmit = async () => {
		setIsSubmitting(true);
		await onSubmit();
		setIsSubmitting(false);
	};

	const areActionsDisabled = isSubmitting || isRunning;
	return (
		<div>
			<Tabs defaultValue="test-case-editor">
				<TabsList variant="line" className="gap-2">
					<TabsTrigger value="test-case-editor">
						<SquareCheck />
						Test Cases
					</TabsTrigger>
					<TabsTrigger value="output">
						<Terminal />
						Output
					</TabsTrigger>
				</TabsList>
				<div className="p-2.5">
					<TabsContent value="test-case-editor">
						<TestCaseEditor editor={testCaseEditor} />
					</TabsContent>
					<TabsContent value="output">
						<TestCaseOutputs testCases={[]} />
					</TabsContent>
				</div>
			</Tabs>
			<div className="flex flex-row items-center justify-end gap-2 pt-2">
				<Button
					size="lg"
					variant="secondary"
					onClick={handleRun}
					disabled={areActionsDisabled}
				>
					{isRunning ? (
						<>
							<LoadingIndicator />
							<span>Running...</span>
						</>
					) : (
						"Run"
					)}
				</Button>
				<Button
					size="lg"
					onClick={handleSubmit}
					disabled={areActionsDisabled}
				>
					{isSubmitting ? (
						<>
							<LoadingIndicator />
							<span>Submitting...</span>
						</>
					) : (
						"Submit"
					)}
				</Button>
			</div>
		</div>
	);
}

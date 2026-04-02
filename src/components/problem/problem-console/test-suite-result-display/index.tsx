import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { SUBMISSION_STATUSES } from "@/lib/submissions/types";
import type { SubmissionStatus } from "@/lib/submissions/types";

import SpecficTestCaseTabTrigger from "../shared/specific-test-case-tab-trigger";
import { submissionStatusToDisplayMessage } from "./constants";
import TestSuiteResultDisplayEmpty from "./empty";
import TestSuiteResultDisplayLoading from "./loading";
import ResultTitle from "./result-title";

type TestCaseResult = {
	status: SubmissionStatus;
	errorMessage?: string;
	inputs: Array<{ label: string; value: string }>;
	stdout: string;
	output: string;
	expected: string;
};

export type TestCaseOutputsProps = {
	status: SubmissionStatus;
	errorMessage?: string;
	testCaseResults: Array<TestCaseResult>;
};

export default function TestSuiteResultDisplay({
	status,
	errorMessage,
	testCaseResults,
}: TestCaseOutputsProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const titleVariant =
		status === SUBMISSION_STATUSES.ACCEPTED ? "success" : "error";
	const titleText = submissionStatusToDisplayMessage[status];

	return (
		<Tabs value={activeIndex} onValueChange={setActiveIndex}>
			<div className="flex flex-col gap-2">
				<ResultTitle variant={titleVariant} className="ml-1">
					{titleText}
				</ResultTitle>
				{errorMessage && (
					<pre className="rounded-md bg-destructive/10 px-4 py-2 font-mono text-destructive">
						{errorMessage}
					</pre>
				)}
			</div>
			<TabsList className="gap-4 bg-transparent group-data-horizontal/tabs:h-10">
				{testCaseResults.map((testCaseResult, testCaseIndex) => (
					<SpecficTestCaseTabTrigger
						key={testCaseIndex}
						index={testCaseIndex}
						isActive={activeIndex === testCaseIndex}
						iconBefore={
							testCaseResult.status ===
							SUBMISSION_STATUSES.ACCEPTED
								? CircleCheck // TODO: success/error should be extracted in tailwind and used as the class
								: CircleX
						}
					/>
				))}
			</TabsList>
			{testCaseResults.map((testCaseResult, testCaseIndex) => (
				<TabsContent
					key={testCaseIndex}
					value={testCaseIndex}
					tabIndex={-1}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1">
						{testCaseResult.errorMessage && (
							<pre className="rounded-md bg-destructive/30 px-3 py-2 font-mono text-destructive">
								{testCaseResult.errorMessage}
							</pre>
						)}
					</div>
					<div className="flex flex-col gap-0.5">
						<p className="font-mono text-muted-foreground">Input</p>
						<div className="flex flex-col gap-2">
							{testCaseResult.inputs.map(
								({ label, value }, index) => {
									return (
										<div
											key={index}
											className="flex flex-col gap-0.5 rounded-md border border-input bg-input/30 px-3 py-2 font-mono"
										>
											<p className="text-muted-foreground">
												{label} =
											</p>
											<pre>{value}</pre>
										</div>
									);
								},
							)}
						</div>
					</div>
					{testCaseResult.stdout && (
						<div className="flex flex-col gap-0.5">
							<p className="font-mono text-muted-foreground">
								Stdout
							</p>
							<pre className="w-full rounded-sm border border-input bg-transparent px-3 py-2 font-mono dark:bg-input/30">
								{testCaseResult.stdout}
							</pre>
						</div>
					)}
					<div className="flex flex-col gap-0.5">
						<p className="font-mono text-muted-foreground">
							Output
						</p>
						<pre className="w-full rounded-sm border border-input bg-transparent px-3 py-2 font-mono dark:bg-input/30">
							{testCaseResult.output}
						</pre>
					</div>
					<div className="flex flex-col gap-0.5">
						<p className="font-mono text-muted-foreground">
							Expected
						</p>
						<pre className="w-full rounded-sm border border-input bg-transparent px-3 py-2 font-mono dark:bg-input/30">
							{testCaseResult.expected}
						</pre>
					</div>
				</TabsContent>
			))}
		</Tabs>
	);
}

TestSuiteResultDisplay.Loading = TestSuiteResultDisplayLoading;
TestSuiteResultDisplay.Empty = TestSuiteResultDisplayEmpty;

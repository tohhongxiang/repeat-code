import { CircleSlash, Plus, RotateCcw } from "lucide-react";
import { Controller } from "react-hook-form";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import SpecficTestCaseTabTrigger from "../shared/specific-test-case-tab-trigger";
import type { TestCaseEditorState } from "./use-problem-test-case-editor";

interface TestCaseEditorProps {
	editor: TestCaseEditorState;
}

export default function TestCaseEditor({ editor }: TestCaseEditorProps) {
	const {
		form,
		testCases: { fields, cloneCurrent, remove, reset, canAddTestCase },
		tabs: { activeIndex, setActiveIndex },
	} = editor;

	if (fields.length === 0) {
		return (
			<div className="flex flex-col items-center gap-4 p-8">
				<CircleSlash className="size-12" />
				<p className="text-muted-foreground">No test cases</p>
			</div>
		);
	}

	return (
		<Tabs value={activeIndex} onValueChange={setActiveIndex}>
			<div className="flex flex-row items-center justify-start gap-2">
				<TabsList className="gap-4 bg-transparent group-data-horizontal/tabs:h-10">
					{fields.map((field, testCaseIndex) => (
						<SpecficTestCaseTabTrigger
							key={field.id}
							index={testCaseIndex}
							isActive={activeIndex === testCaseIndex}
							onDelete={() => remove(testCaseIndex)}
							deleteEnabled={fields.length > 1}
						/>
					))}
				</TabsList>
				{canAddTestCase && (
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									size="icon"
									variant="ghost"
									onClick={cloneCurrent}
								>
									<Plus />
									<span className="sr-only">
										Add test case
									</span>
								</Button>
							}
						/>
						<TooltipContent side="bottom">
							Clone current test case
						</TooltipContent>
					</Tooltip>
				)}
				<ConfirmationDialog
					title="Reset Test Cases?"
					description="This action is permanent! You will reset the test cases back to their defaults"
					trigger={
						<Button
							variant="outline"
							size="lg"
							className="group ml-auto"
						>
							<RotateCcw className="transition-transform duration-75 group-focus-within:-rotate-45 group-hover:-rotate-45" />
							Reset
						</Button>
					}
					confirmButtonText="Reset"
					onConfirm={reset}
				/>
			</div>
			{fields.map((testCase, testCaseIndex) => (
				<TabsContent
					key={testCase.id}
					value={testCaseIndex}
					tabIndex={-1}
					className="flex flex-col gap-4"
				>
					{testCase.inputs.map(({ label }, parameterIndex) => (
						<div key={label}>
							<Controller
								name={`testCases.${testCaseIndex}.inputs.${parameterIndex}.value`}
								control={form.control}
								render={({
									field: controllerField,
									fieldState,
								}) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldContent>
											<FieldLabel
												htmlFor={controllerField.name}
												className="font-mono text-muted-foreground"
											>
												{label} =
											</FieldLabel>
											<Input
												id={controllerField.name}
												{...controllerField}
												type="text"
												className="font-mono"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</FieldContent>
									</Field>
								)}
							/>
						</div>
					))}
				</TabsContent>
			))}
		</Tabs>
	);
}

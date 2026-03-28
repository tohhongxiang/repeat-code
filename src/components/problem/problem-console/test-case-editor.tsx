import { Plus, RotateCcw, X } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { TestCaseEditorState } from "./use-test-case-editor";

interface TestCaseEditorProps {
	editor: TestCaseEditorState;
}

export default function TestCaseEditor({ editor }: TestCaseEditorProps) {
	const {
		form,
		testCases: { fields, cloneCurrent, remove, reset, canAddTestCase },
		tabs: { activeIndex, setActiveIndex },
	} = editor;
	return (
		<div>
			<Tabs value={activeIndex} onValueChange={setActiveIndex}>
				<div className="flex flex-row items-center justify-start gap-2">
					<TabsList className="gap-4 bg-transparent group-data-horizontal/tabs:h-10">
						{fields.map((field, testCaseIndex) => (
							<div
								key={field.id}
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

								<Button
									size="icon-xs"
									variant="destructive"
									type="button"
									className={cn(
										"absolute -top-2 -right-2 size-5 rounded-full border p-px opacity-0 transition-opacity duration-75 group-focus-within:opacity-100 group-hover:opacity-100",
										activeIndex === testCaseIndex &&
											"opacity-100",
										fields.length === 1 && "hidden",
									)}
									onClick={() => remove(testCaseIndex)}
								>
									<X className="size-3 stroke-3" />
									<span className="sr-only">
										Delete test case {testCaseIndex + 1}
									</span>
								</Button>
							</div>
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
						{testCase.inputs.map(({ name }, parameterIndex) => (
							<div key={name}>
								<Controller
									name={`testCases.${testCaseIndex}.inputs.${parameterIndex}.value`}
									control={form.control}
									render={({
										field: controllerField,
										fieldState,
									}) => (
										<Field
											data-invalid={fieldState.invalid}
										>
											<FieldContent>
												<FieldLabel
													htmlFor={
														controllerField.name
													}
													className="font-mono text-muted-foreground"
												>
													{name} =
												</FieldLabel>
												<Input
													id={controllerField.name}
													{...controllerField}
													type="text"
													className="font-mono"
												/>
												{fieldState.invalid && (
													<FieldError
														errors={[
															fieldState.error,
														]}
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
		</div>
	);
}

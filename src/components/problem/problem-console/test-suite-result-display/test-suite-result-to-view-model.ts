import type { Problem } from "@/lib/problem/types";
import type { TestCaseResult, TestSuiteResult } from "@/lib/submissions/types";

import type { TestCaseOutputsProps } from ".";

export function transformTestSuiteResultToViewModel({
	result,
	problem,
}: {
	result: TestSuiteResult;
	problem: Problem;
}): TestCaseOutputsProps {
	return {
		status: result.status,
		errorMessage: result.error?.message,
		testCaseResults: (result.results ?? []).map((r) =>
			transformTestCase(r, problem),
		),
	};
}

function transformTestCase(result: TestCaseResult, problem: Problem) {
	const testCase = result.testCase;

	return {
		status: result.status,
		errorMessage: result.error?.message,
		inputs: formatInputs(testCase, problem),
		stdout: result.stdout ?? "",
		output: formatValue(result.result),
		expected: formatValue(testCase.expected ?? null),
	};
}

function formatInputs(
	testCase: TestCaseResult["testCase"],
	problem: Problem,
): Array<{ label: string; value: string }> {
	const { operations, arguments: argumentsForAllOperations } = testCase;

	// multi-method / class-style
	if (operations.length > 1) {
		return [
			{
				label: "Operations",
				value: JSON.stringify(operations).replaceAll(",", ", "),
			},
			{
				label: "Arguments",
				value: JSON.stringify(argumentsForAllOperations).replaceAll(
					",",
					", ",
				),
			},
		];
	}

	// single-method / function-style
	const method = problem.api.methods.find((m) => m.name === operations[0]);

	if (!method) {
		return [
			{
				label: "Arguments",
				value: JSON.stringify(
					argumentsForAllOperations[0] ?? [],
				).replaceAll(",", ", "),
			},
		];
	}

	const values = argumentsForAllOperations[0] ?? [];

	return method.parameters.map((param, i) => ({
		label: param.name,
		value: JSON.stringify(values[i] ?? ""),
	}));
}

function formatValue(value: Array<unknown> | null): string {
	if (!value) return "null";
	if (value.length === 1) return JSON.stringify(value[0]) ?? "";
	return JSON.stringify(value).replaceAll(",", ", ");
}

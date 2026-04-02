import type { Problem, TestCase } from "@/lib/problem/types";

export default function convertProblemTestCasesToInputs(
	testCase: TestCase,
	methods: Problem["api"]["methods"],
) {
	const { operations, arguments: args } = testCase;

	if (operations.length === 0) {
		throw new Error("Invalid test case: No operations");
	}

	// Multi-operation / class-style problems
	if (operations.length > 1) {
		return {
			inputs: [
				{
					label: "Operations",
					value: JSON.stringify(operations).replace(/,/g, ", "),
				},
				{
					label: "Arguments",
					value: JSON.stringify(args).replace(/,/g, ", "),
				},
			],
		};
	}

	// Single-operation / function-style problems
	const operation = operations[0];
	const method = methods.find((method) => method.name === operation);
	if (!method) {
		throw new Error(`Operation not found in problem API: ${operation}`);
	}

	const operationArgs = args[0] ?? [];

	return {
		inputs: method.parameters.map(({ name }, index) => {
			const value = operationArgs[index];

			if (value === undefined) {
				throw new Error(
					`Parameter in operation not found: ${operation}.${name}`,
				);
			}

			return {
				label: name,
				value: JSON.stringify(value),
			};
		}),
	};
}

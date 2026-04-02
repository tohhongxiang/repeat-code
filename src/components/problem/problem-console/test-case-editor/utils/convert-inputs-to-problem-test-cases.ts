import type { Problem } from "@/lib/problem/types";

// TODO: This type should be global
type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [key: string]: JSONType };
type JSONArray = Array<JSONType>;

export type JSONType = JSONPrimitive | JSONObject | JSONArray;

export default function convertInputToProblemTestCase(
	methods: Problem["api"]["methods"],
	inputs: Array<{ label: string; value: string }>,
) {
	if (inputs.length === 0) {
		throw new Error("Invalid editor test case: No inputs");
	}

	const operationsInput = inputs.find(
		(input) => input.label === "Operations",
	);
	const argumentsInput = inputs.find((input) => input.label === "Arguments");

	if (operationsInput && argumentsInput) {
		return {
			operations: JSON.parse(operationsInput.value) as Array<string>,
			arguments: JSON.parse(argumentsInput.value) as Array<
				Array<JSONType>
			>,
		};
	}

	const method = methods[0];
	if (!method) {
		throw new Error("Problem has no methods");
	}

	const args = method.parameters.map(({ name }) => {
		const input = inputs.find((input) => input.label === name);

		if (!input) {
			throw new Error(
				`Missing input for parameter: ${method.name}.${name}`,
			);
		}

		return JSON.parse(input.value) as JSONType;
	});

	return {
		operations: [method.name],
		arguments: [args],
	};
}

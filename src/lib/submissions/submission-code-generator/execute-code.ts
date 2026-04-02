import type { Language } from "@/lib/language/types";
import type { TestCase } from "@/lib/problem/types";

import { JUDGE0_STATUSES } from "../code-runner/get-submission";
import runCode from "../code-runner/judge0";
import { RawExecutionResultSchema, SUBMISSION_STATUSES } from "../types";
import type { RawExecutionResult } from "../types";
import generateCode from "./generate-code";

export default async function executeCode({
	language,
	code,
	testCases,
}: {
	language: Language;
	code: string;
	testCases: Array<Omit<TestCase, "expected">>;
}): Promise<RawExecutionResult> {
	const processedTemplate = await generateCode({
		language,
		code,
		testCases,
	});
	const response = await runCode({
		judge0LanguageID: language.judge0Id,
		code: processedTemplate,
	});

	// TODO: Handle all the statuses
	if (response.status.id === JUDGE0_STATUSES.TIME_LIMIT_EXCEEDED) {
		return {
			status: SUBMISSION_STATUSES.TIME_LIMIT_EXCEEDED,
			error: {
				message: "Your code took too long to run",
			},
			stdout: null,
			results: null,
		};
	} else if (response.status.id === JUDGE0_STATUSES.INTERNAL_ERROR) {
		return {
			status: SUBMISSION_STATUSES.INTERNAL_ERROR,
			error: {
				message: `An unexpected error occurred: ${response.message || response.status.description}`,
			},
			stdout: null,
			results: null,
		};
	}

	const { stdout } = response;
	if (!stdout) {
		throw new Error("Invalid results from code execution");
	}

	console.log(stdout);

	const rawExecutionResult = RawExecutionResultSchema.parse(
		JSON.parse(stdout),
	);
	return rawExecutionResult;
}

import { createServerFn } from "@tanstack/react-start";

import getLanguage from "@/lib/language/get-language";
import getProblem from "@/lib/problem/get-problem";
import {
	SUBMISSION_STATUSES,
	TestSuiteResultSchema,
	submissionWithCustomTestCasesInputSchema,
} from "@/lib/submissions/types";
import type {
	RawExecutionResult,
	SubmissionStatus,
	TestCaseResult,
	TestCaseResultAccepted,
	TestCaseResultRejected,
} from "@/lib/submissions/types";

import executeCode from "../submission-code-generator/execute-code";
import processUserResultsWithReference from "./utils/process-user-results-with-reference";

export const submitWithCustomTestCases = createServerFn({ method: "POST" })
	.inputValidator(submissionWithCustomTestCasesInputSchema)
	.handler(
		async ({
			data: { testCases, code: userCode, languageID, problemID },
		}) => {
			const problem = await getProblem(problemID);
			if (!problem) {
				throw new Error(`Problem ${problemID} not found`);
			}

			const language = await getLanguage(languageID);
			if (!language) {
				throw new Error(`Language ${languageID} not found`);
			}

			const referenceSolution = problem.referenceSolution;
			if (!referenceSolution) {
				throw new Error(`Reference solution not found`);
			}

			const referenceSolutionLanguage = await getLanguage(
				referenceSolution.languageID,
			);
			if (!referenceSolutionLanguage) {
				throw new Error(
					`Reference solution language ${languageID} not found`,
				);
			}

			const userTask = executeCode({
				code: userCode,
				language,
				testCases,
			});
			const solutionTask = executeCode({
				code: referenceSolution.code,
				language: referenceSolutionLanguage,
				testCases,
			});

			let referenceResponse: RawExecutionResult;
			try {
				referenceResponse = await solutionTask;
			} catch (err) {
				return generateFailedTestSuiteResult({
					errorMessage: String(err),
				});
			}

			if (referenceResponse.error) {
				return generateFailedTestSuiteResult({
					status: SUBMISSION_STATUSES.INTERNAL_ERROR,
					errorMessage: `Solution execution failed: ${referenceResponse.error.message}`,
				});
			}

			let userResponse: RawExecutionResult;
			try {
				userResponse = await userTask;
			} catch (err) {
				return generateFailedTestSuiteResult({
					errorMessage: String(err),
				});
			}

			if (userResponse.error) {
				return TestSuiteResultSchema.parse(userResponse);
			}

			const processedResults = processUserResultsWithReference({
				userResults: userResponse.results,
				referenceResults: referenceResponse.results,
				validator: problem.execution.validator,
			});

			if (isFullyAcceptedResults(processedResults)) {
				return {
					...userResponse,
					status: SUBMISSION_STATUSES.ACCEPTED,
					error: null,
					results: processedResults,
				};
			}

			const failureStatus =
				processedResults.find(isRejectedResult)?.status ??
				SUBMISSION_STATUSES.INTERNAL_ERROR;

			return {
				...userResponse,
				status: failureStatus,
				results: processedResults,
			};
		},
	);

function generateFailedTestSuiteResult({
	status = SUBMISSION_STATUSES.INTERNAL_ERROR,
	errorMessage = "Something went wrong",
}: {
	status?: SubmissionStatus;
	errorMessage?: string;
}) {
	return TestSuiteResultSchema.parse({
		success: false,
		status: status,
		error: {
			message: errorMessage,
		},
		stdout: "",
		results: [],
	});
}

function isFullyAcceptedResults(
	results: Array<TestCaseResult>,
): results is Array<TestCaseResultAccepted> {
	return results.every(
		(result) => result.status === SUBMISSION_STATUSES.ACCEPTED,
	);
}

function isRejectedResult(
	result: TestCaseResult,
): result is TestCaseResultRejected {
	return result.status !== SUBMISSION_STATUSES.ACCEPTED;
}

import { VALIDATORS } from "@/lib/problem/types";
import type { ProblemValidator, TestCase } from "@/lib/problem/types";
import { SUBMISSION_STATUSES } from "@/lib/submissions/types";
import type {
	RawExecutionResultSuccess,
	TestCaseResult,
} from "@/lib/submissions/types";

export default function processUserResultsWithReference({
	userResults,
	referenceResults,
	validator,
}: {
	userResults: RawExecutionResultSuccess["results"];
	referenceResults: RawExecutionResultSuccess["results"];
	validator: ProblemValidator;
}): Array<TestCaseResult> {
	return userResults.map((userResult, index) => {
		const referenceResult = referenceResults[index];
		if (!referenceResult || referenceResult.status) {
			return {
				...userResult,
				status: SUBMISSION_STATUSES.INTERNAL_ERROR,
			};
		}

		if (userResult.status) {
			return {
				...userResult,
				testCase: {
					...userResult.testCase,
					expected: referenceResult.result,
				},
			};
		}

		const isCorrect = isUserOutputCorrect({
			userOutput: userResult.result,
			referenceOutput: referenceResult.result,
			validationMethod: validator,
		});

		const testCaseWithExpected = {
			...userResult.testCase,
			expected: referenceResult.result,
		};

		if (isCorrect) {
			return {
				...userResult,
				testCase: testCaseWithExpected,
				status: SUBMISSION_STATUSES.ACCEPTED,
				error: null,
			};
		}

		return {
			...userResult,
			testCase: testCaseWithExpected,
			status: SUBMISSION_STATUSES.WRONG_ANSWER,
		};
	});
}

function isUserOutputCorrect({
	userOutput,
	referenceOutput,
	validationMethod,
}: {
	userOutput: TestCase["expected"];
	referenceOutput: TestCase["expected"];
	validationMethod: ProblemValidator;
}): boolean {
	if (validationMethod === VALIDATORS.EXACT_MATCH) {
		if (!userOutput) {
			return !referenceOutput;
		}

		return userOutput.every(
			(output, index) => referenceOutput?.[index] === output,
		);
	}

	if (userOutput.length !== referenceOutput.length) {
		return false;
	}

	return userOutput.every((userValue, index) => {
		const referenceValue = referenceOutput[index];

		if (!Array.isArray(userValue) || !Array.isArray(referenceValue)) {
			return false;
		}

		if (userValue.length !== referenceValue.length) {
			return false;
		}

		const normalize = (arr: Array<unknown>) =>
			arr.map((item) => JSON.stringify(item)).sort();

		const sortedUser = normalize(userValue);
		const sortedReference = normalize(referenceValue);

		return sortedUser.every((value, i) => value === sortedReference[i]);
	});
}

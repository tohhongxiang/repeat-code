import z from "zod";

import { testCaseSchema } from "../problem/types";

export const submissionWithCustomTestCasesInputSchema = z.object({
	testCases: z
		.array(testCaseSchema.omit({ expected: true }))
		.min(1, { error: "At least 1 test case is required" }),
	code: z.string(),
	languageID: z.string(),
	problemID: z.string(),
});

export type SubmissionWithCustomTestCasesInput = z.infer<
	typeof submissionWithCustomTestCasesInputSchema
>;

const ExecutionErrorSchema = z.object({
	message: z.string(),
	line: z.number().nullable().optional(),
	end_line: z.number().nullable().optional(),
	column: z.number().nullable().optional(),
	end_column: z.number().nullable().optional(),
});

export const SUBMISSION_STATUSES = {
	ACCEPTED: "ACCEPTED",
	WRONG_ANSWER: "WRONG_ANSWER",
	TIME_LIMIT_EXCEEDED: "TIME_LIMIT_EXCEEDED",
	MEMORY_LIMIT_EXCEEDED: "MEMORY_LIMIT_EXCEEDED",
	RUNTIME_ERROR: "RUNTIME_ERROR",
	COMPILATION_ERROR: "COMPILATION_ERROR",
	INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type SubmissionStatus =
	(typeof SUBMISSION_STATUSES)[keyof typeof SUBMISSION_STATUSES];

const acceptedSubmissionStatuses = [SUBMISSION_STATUSES.ACCEPTED] as const;
const nonAcceptedSubmissionStatuses = [
	SUBMISSION_STATUSES.WRONG_ANSWER,
	SUBMISSION_STATUSES.TIME_LIMIT_EXCEEDED,
	SUBMISSION_STATUSES.MEMORY_LIMIT_EXCEEDED,
	SUBMISSION_STATUSES.RUNTIME_ERROR,
	SUBMISSION_STATUSES.COMPILATION_ERROR,
	SUBMISSION_STATUSES.INTERNAL_ERROR,
] as const;

const TestCaseResultAcceptedSchema = z.object({
	testCase: testCaseSchema,
	status: z.enum(acceptedSubmissionStatuses),
	result: z.array(z.json()).nullable(),
	error: z.null().optional(),
	stdout: z.string().nullable(),
});
export type TestCaseResultAccepted = z.infer<
	typeof TestCaseResultAcceptedSchema
>;

const TestCaseResultRejectedSchema = z.object({
	testCase: testCaseSchema,
	status: z.enum(nonAcceptedSubmissionStatuses),
	result: z.array(z.json()).nullable(),
	error: ExecutionErrorSchema.nullable().optional(),
	stdout: z.string().nullable(),
});
export type TestCaseResultRejected = z.infer<
	typeof TestCaseResultRejectedSchema
>;

const TestCaseResultSchema = z.discriminatedUnion("status", [
	TestCaseResultAcceptedSchema,
	TestCaseResultRejectedSchema,
]);
export type TestCaseResult = z.infer<typeof TestCaseResultSchema>;

export const TestSuiteResultSchema = z.discriminatedUnion("status", [
	z.object({
		status: z.enum(acceptedSubmissionStatuses),
		error: z.null(),
		stdout: z.string().nullable(),
		results: z.array(TestCaseResultAcceptedSchema),
	}),
	z.object({
		status: z.enum(nonAcceptedSubmissionStatuses),
		error: ExecutionErrorSchema.nullable(),
		stdout: z.string().nullable(),
		results: z.array(TestCaseResultSchema).nullable(),
	}),
]);

export type TestSuiteResult = z.infer<typeof TestSuiteResultSchema>;

export const RawExecutionResultErrorSchema = z.object({
	status: z.enum(nonAcceptedSubmissionStatuses),
	error: ExecutionErrorSchema,
	stdout: z.string().nullable(),
	results: z.null(),
});
export type RawExecutionResultError = z.infer<
	typeof RawExecutionResultErrorSchema
>;

const testCaseWithoutExpected = testCaseSchema.extend({
	expected: testCaseSchema.shape.expected.optional(),
});
export const RawExecutionResultSuccessSchema = z.object({
	error: z.null(),
	stdout: z.string().nullable(),
	results: z.array(
		z.union([
			z.object({
				status: z.enum(nonAcceptedSubmissionStatuses),
				testCase: testCaseWithoutExpected,
				result: z.array(z.json()).nullable(),
				error: ExecutionErrorSchema.nullable().optional(),
				stdout: z.string().nullable(),
			}),
			z.object({
				status: z.undefined(),
				testCase: testCaseWithoutExpected,
				result: z.array(z.json()),
				error: z.null().optional(),
				stdout: z.string().nullable(),
			}),
		]),
	),
});
export type RawExecutionResultSuccess = z.infer<
	typeof RawExecutionResultSuccessSchema
>;

export const RawExecutionResultSchema = z.union([
	RawExecutionResultSuccessSchema,
	RawExecutionResultErrorSchema,
]);

export type RawExecutionResult = z.infer<typeof RawExecutionResultSchema>;

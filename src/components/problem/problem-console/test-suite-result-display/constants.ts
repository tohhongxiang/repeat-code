import { SUBMISSION_STATUSES } from "@/lib/submissions/types";

export const submissionStatusToDisplayMessage: Record<
	(typeof SUBMISSION_STATUSES)[keyof typeof SUBMISSION_STATUSES],
	string
> = {
	[SUBMISSION_STATUSES.ACCEPTED]: "Accepted",
	[SUBMISSION_STATUSES.WRONG_ANSWER]: "Wrong Answer",
	[SUBMISSION_STATUSES.TIME_LIMIT_EXCEEDED]: "Time limit exceeded",
	[SUBMISSION_STATUSES.MEMORY_LIMIT_EXCEEDED]: "Memory limit exceeded",
	[SUBMISSION_STATUSES.RUNTIME_ERROR]: "Runtime Error",
	[SUBMISSION_STATUSES.COMPILATION_ERROR]: "Compilation Error",
	[SUBMISSION_STATUSES.INTERNAL_ERROR]: "Unknown Error",
} as const;

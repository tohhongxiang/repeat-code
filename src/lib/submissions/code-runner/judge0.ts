import type { Language } from "@/lib/language/types";

import createSubmission from "./create-submission";
import getSubmission, { JUDGE0_STATUSES } from "./get-submission";
import type { SubmissionResponse } from "./get-submission";

const MAX_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = 2000;

async function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export default async function runCode({
	judge0LanguageID,
	code,
}: {
	judge0LanguageID: Language["judge0Id"];
	code: string;
}) {
	const { token } = await createSubmission({ judge0LanguageID, code });
	await sleep(RETRY_INTERVAL_MS);

	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		const response = await getSubmission(token);
		if (
			response.status.id === JUDGE0_STATUSES.IN_QUEUE ||
			response.status.id === JUDGE0_STATUSES.PROCESSING
		) {
			await sleep(RETRY_INTERVAL_MS);
			continue;
		}

		return response;
	}

	// After MAX_ATTEMPTS, return a timeout internal error
	return {
		stdout: null,
		stderr: null,
		compile_output: null,
		message: null,
		status: {
			id: JUDGE0_STATUSES.INTERNAL_ERROR,
			description: "Timeout",
		},
		token,
		time: 0,
		memory: 0,
	} as SubmissionResponse;
}

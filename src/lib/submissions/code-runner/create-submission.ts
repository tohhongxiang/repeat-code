import z from "zod";

import type { Language } from "@/lib/language/types";

const CreateSubmissionResponseSchema = z.object({ token: z.string() });

export default async function createSubmission({
	judge0LanguageID,
	code,
}: {
	judge0LanguageID: Language["judge0Id"];
	code: string;
}) {
	const response = await fetch(`https://ce.judge0.com/submissions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			language_id: judge0LanguageID,
			source_code: code,
		}),
	});

	if (!response.ok) {
		throw new Error(`Judge0 create submission failed: ${response.status}`);
	}

	const data = await response.json();
	return CreateSubmissionResponseSchema.parse(data);
}

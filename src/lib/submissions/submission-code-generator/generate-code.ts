import { readFile } from "node:fs/promises";

import type { Language } from "@/lib/language/types";
import type { TestCase } from "@/lib/problem/types";

const LANGUAGE_TO_TEST_HARNESS_NAME: Record<Language["judge0Id"], string> = {
	71: "python3.py",
};

export default async function generateCode({
	language,
	code,
	testCases,
}: {
	language: Language;
	code: string;
	testCases: Array<Omit<TestCase, "expected">>;
}) {
	const template = await readFile(
		new URL(
			`./test-harness-templates/${LANGUAGE_TO_TEST_HARNESS_NAME[language.judge0Id]}`,
			import.meta.url,
		),
		"utf-8",
	);

	if (!template) {
		throw new Error("Template not found");
	}

	const processedTemplate = template
		.replace("{{{ TEST_CASES }}}", JSON.stringify(testCases))
		.replace(
			"{{{ USER_CODE }}}",
			code.replace(/\r\n/g, "\n").replace(/\t/g, "    "),
		);

	return processedTemplate;
}

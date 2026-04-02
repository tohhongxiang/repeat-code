import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import type { Problem } from "@/lib/problem/types";
import { submitWithCustomTestCases } from "@/lib/submissions/submit-with-custom-test-cases";

import type useProblemTestCaseEditor from "../problem-console/test-case-editor/use-problem-test-case-editor";
import convertInputToProblemTestCase from "../problem-console/test-case-editor/utils/convert-inputs-to-problem-test-cases";
import { transformTestSuiteResultToViewModel } from "../problem-console/test-suite-result-display/test-suite-result-to-view-model";

export default function useProblemRunner({
	problem,
	code,
	selectedLanguage,
	testCaseEditor,
	onRunStart,
}: {
	problem?: Problem;
	code: string;
	selectedLanguage?: { id: string };
	testCaseEditor: ReturnType<typeof useProblemTestCaseEditor>;
	onRunStart: () => void;
}) {
	const mutation = useMutation({
		mutationFn: submitWithCustomTestCases,
	});

	const result = useMemo(() => {
		if (!mutation.data || !problem) {
			return null;
		}

		return transformTestSuiteResultToViewModel({
			result: mutation.data,
			problem,
		});
	}, [mutation.data, problem]);

	const run = async () => {
		if (!problem || !selectedLanguage?.id) {
			return;
		}

		const valid = await testCaseEditor.validate();

		if (!valid) {
			return;
		}

		onRunStart();

		const editorCases = testCaseEditor.form.getValues().testCases;

		await mutation.mutateAsync({
			data: {
				testCases: editorCases.map((editorTestCase) =>
					convertInputToProblemTestCase(
						problem.api.methods,
						editorTestCase.inputs,
					),
				),
				code,
				languageID: selectedLanguage.id,
				problemID: problem.id,
			},
		});
	};

	return {
		run,
		isRunning: mutation.isPending,
		result,
	};
}

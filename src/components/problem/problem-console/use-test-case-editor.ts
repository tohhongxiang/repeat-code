import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

import { testCaseSchema } from "./types";
import type { TestCase } from "./types";

const formSchema = z.object({
	testCases: z.array(testCaseSchema),
});

const MAX_TEST_CASES = 5;
export default function useTestCaseEditor({
	initialTestCases,
	maxTestCases = MAX_TEST_CASES,
}: {
	initialTestCases: Array<TestCase>;
	maxTestCases?: number;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			testCases: initialTestCases,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "testCases",
	});

	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const handleCloneCurrentTestCase = () => {
		if (fields.length >= maxTestCases) {
			return;
		}

		append(form.getValues(`testCases.${activeTabIndex}`));
		setActiveTabIndex(fields.length);
	};

	const handleRemoveTestCase = (index: number) => {
		if (fields.length === 1) {
			return;
		}

		setActiveTabIndex((current) => {
			if (index === current && index < fields.length - 1) {
				return current;
			}

			if (index > current) return current;

			return Math.max(0, current - 1);
		});

		remove(index);
	};

	const handleResetTestCases = () => {
		form.reset();
		setActiveTabIndex(0);
	};

	const handleValidateTestCases = async () => {
		const isValid = await form.trigger();
		if (isValid) {
			return true;
		}

		// Use form.getFieldState instead of directly accessing form.formState.errors
		// because the errors are only updated on the next render cycle
		for (let i = 0; i < fields.length; i++) {
			if (form.getFieldState(`testCases.${i}`).invalid) {
				setActiveTabIndex(i);
				return false;
			}
		}

		return true;
	};

	return {
		form,
		testCases: {
			canAddTestCase: fields.length < maxTestCases,
			fields,
			cloneCurrent: handleCloneCurrentTestCase,
			remove: handleRemoveTestCase,
			reset: handleResetTestCases,
		},
		tabs: {
			activeIndex: activeTabIndex,
			setActiveIndex: setActiveTabIndex,
		},
		validate: handleValidateTestCases,
	};
}

export type TestCaseEditorState = ReturnType<typeof useTestCaseEditor>;

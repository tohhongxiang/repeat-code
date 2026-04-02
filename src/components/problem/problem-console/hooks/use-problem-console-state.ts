import { useState } from "react";

export const CONSOLE_TABS = {
	TEST_CASE_EDITOR: "TEST_CASE_EDITOR",
	OUTPUT: "OUTPUT",
} as const;

export type ProblemConsoleTabs =
	(typeof CONSOLE_TABS)[keyof typeof CONSOLE_TABS];

export default function useProblemConsoleState() {
	const [currentTab, setCurrentTab] = useState<ProblemConsoleTabs>(
		CONSOLE_TABS.TEST_CASE_EDITOR,
	);

	return { currentTab, setCurrentTab, tabs: CONSOLE_TABS };
}

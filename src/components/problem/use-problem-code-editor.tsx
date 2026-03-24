import { useMemo } from "react";

import useLocalStorageState from "@/hooks/use-local-storage-state";
import type { Language } from "@/lib/language/types";
import type { Problem } from "@/lib/problem/types";

const LAST_USED_LANGUAGE_STORAGE_KEY = "editor:last-language";
export default function useProblemCodeEditor(problem?: Problem) {
	const availableLanguages = useMemo(
		() => problem?.starterCode.map((s) => s.language) ?? [],
		[problem],
	);

	// Use the last language that the user selected, default to the first language in the available languages array
	const [selectedLanguageID, setSelectedLanguageID] = useLocalStorageState(
		LAST_USED_LANGUAGE_STORAGE_KEY,
		availableLanguages[0]?.id,
	);

	const selectedLanguage =
		availableLanguages.find((l) => l.id === selectedLanguageID) ??
		availableLanguages[0];

	const starterCode = useMemo(
		() =>
			problem?.starterCode.find(
				(s) => s.language.id === selectedLanguage?.id, // use selectedLanguage.id here instead of selectedLanguageID to allow fallback behavior
			)?.code ?? "",
		[problem, selectedLanguage],
	);

	const [userCode, setUserCode] = useLocalStorageState(
		getStorageKey(problem?.id, selectedLanguage?.id),
		starterCode,
	);

	return {
		availableLanguages,
		selectedLanguage,
		setSelectedLanguageID,
		userCode,
		setUserCode,
	};
}

function getStorageKey(problemID?: Problem["id"], languageID?: Language["id"]) {
	if (!problemID || !languageID) {
		return undefined;
	}

	return `problem:${problemID}.language:${languageID}`;
}

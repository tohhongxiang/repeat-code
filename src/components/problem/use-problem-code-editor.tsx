import { useMemo, useState } from "react";

import useLocalStorageState from "@/hooks/use-local-storage-state";
import type { Language } from "@/lib/language/types";
import type { Problem } from "@/lib/problem/types";

export default function useProblemCodeEditor(problem?: Problem) {
	const [selectedLanguageID, setSelectedLanguageID] =
		useState<Language["id"]>();

	const availableLanguages = useMemo(
		() => problem?.starterCode.map((s) => s.language) ?? [],
		[problem],
	);
	const selectedLanguage =
		availableLanguages.find((l) => l.id === selectedLanguageID) ??
		availableLanguages[0];

	const starterCode = useMemo(
		() =>
			problem?.starterCode.find(
				(s) => s.language.id === selectedLanguage?.id,
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

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import getLanguages from "@/lib/language/get-languages";

export default function useLanguage() {
	const [selectedLanguageId, setSelectedLanguageId] = useState<
		string | undefined
	>("");

	const { data: availableLanguages = [], isPending: isLoading } = useQuery({
		queryKey: ["languages"],
		queryFn: getLanguages,
	});

	return {
		availableLanguages,
		isLoading,
		selectedLanguage:
			availableLanguages.find(
				(language) => language.id === selectedLanguageId,
			) ??
			availableLanguages[0] ??
			null,
		setSelectedLanguageId,
	};
}

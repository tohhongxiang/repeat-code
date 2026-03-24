import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Language } from "@/lib/language/types";

interface LanguageSelectorProps {
	availableLanguages: Array<Language>;
	selectedLanguageID?: Language["id"] | null | undefined;
	onSelectedLanguageChange: (languageID: Language["id"]) => void;
	isLoading?: boolean;
}

export default function LanguageSelector({
	availableLanguages,
	selectedLanguageID,
	onSelectedLanguageChange,
	isLoading = false,
}: LanguageSelectorProps) {
	const handleValueChange = (languageID: string | null) => {
		if (!languageID) {
			return;
		}

		onSelectedLanguageChange(languageID);
	};

	if (isLoading) {
		return (
			<div>
				<Skeleton className="h-8 w-64" />
			</div>
		);
	}

	const items = availableLanguages.map((language) => ({
		label: language.name,
		value: language.id,
	}));

	return (
		<Select
			items={items}
			value={selectedLanguageID ?? null} // null instead of undefined to prevent uncontrolled input
			onValueChange={handleValueChange}
		>
			<SelectTrigger className="w-64">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map(({ label, value }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

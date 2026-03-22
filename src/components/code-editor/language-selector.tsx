import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface LanguageSelectorProps {
	availableLanguages: Array<{ label: string; value: string }>;
	selectedLanguage: string | null;
	onSelectedLanguageChange: (value: string) => void;
	isLoading?: boolean;
}

export default function LanguageSelector({
	availableLanguages,
	selectedLanguage,
	onSelectedLanguageChange,
	isLoading = false,
}: LanguageSelectorProps) {
	const handleValueChange = (value: string | null) => {
		if (value !== null) {
			onSelectedLanguageChange(value);
		}
	};

	if (isLoading) {
		return (
			<div>
				<Skeleton className="h-8 w-64" />
			</div>
		);
	}

	return (
		<Select
			items={availableLanguages}
			value={selectedLanguage}
			onValueChange={handleValueChange}
		>
			<SelectTrigger className="w-64">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{availableLanguages.map((language) => (
						<SelectItem key={language.value} value={language.value}>
							{language.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

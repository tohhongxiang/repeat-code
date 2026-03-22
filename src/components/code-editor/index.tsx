import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import LanguageSelector from "./language-selector";
import MonacoEditor from "./monaco-editor";
import useLanguage from "./use-language";

export default function CodeEditor() {
	const {
		availableLanguages,
		isLoading,
		selectedLanguage,
		setSelectedLanguageId,
	} = useLanguage();

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex flex-row items-center justify-between px-4 py-2">
				<LanguageSelector
					isLoading={isLoading}
					availableLanguages={availableLanguages.map((language) => ({
						label: language.label,
						value: language.id,
					}))}
					selectedLanguage={selectedLanguage?.id ?? null}
					onSelectedLanguageChange={setSelectedLanguageId}
				/>
				<div className="flex flex-row items-center justify-end gap-2">
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									variant="ghost"
									size="icon"
									className="group"
								>
									<RotateCcw className="transition-transform duration-100 group-hover:-rotate-45" />
								</Button>
							}
						/>
						<TooltipContent side="bottom">
							Reset code
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<MonacoEditor language={selectedLanguage?.monacoValue} />
		</div>
	);
}

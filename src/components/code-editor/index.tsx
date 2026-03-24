import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Language } from "@/lib/language/types";

import LanguageSelector from "./language-selector";
import MonacoEditor from "./monaco-editor";

interface CodeEditorProps {
	availableLanguages: Array<Language>;
	selectedLanguage?: Language;
	onSelectedLanguageChange: (languageID: Language["id"]) => void;
	code: string;
	onCodeChange: (value: string) => void;
}

export default function CodeEditor({
	availableLanguages,
	selectedLanguage,
	onSelectedLanguageChange,
	code,
	onCodeChange,
}: CodeEditorProps) {
	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex flex-row items-center justify-between px-4 py-2">
				<LanguageSelector
					availableLanguages={availableLanguages}
					selectedLanguageID={selectedLanguage?.id}
					onSelectedLanguageChange={onSelectedLanguageChange}
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
			<MonacoEditor
				language={selectedLanguage?.monacoId}
				code={code}
				onCodeChange={onCodeChange}
			/>
		</div>
	);
}

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Language } from "@/lib/language/types";

import ConfirmationDialog from "../confirmation-dialog";
import LanguageSelector from "./language-selector";
import MonacoEditor from "./monaco-editor";

interface CodeEditorProps {
	availableLanguages?: Array<Language>;
	selectedLanguage?: Language;
	onSelectedLanguageChange?: (languageID: Language["id"]) => void;
	code?: string;
	onCodeChange?: (value: string) => void;
	onCodeReset?: () => void;
}

export default function CodeEditor({
	availableLanguages = [],
	selectedLanguage,
	onSelectedLanguageChange,
	code = "",
	onCodeChange,
	onCodeReset,
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
								// Wrap in div so that tool tip content still shows when focus-visible
								<div>
									<ConfirmationDialog
										title="Reset Code?"
										description="This action is permanent! You will reset your code back to the default code."
										confirmButtonText="Reset"
										trigger={
											<Button
												variant="ghost"
												size="icon"
												className="group"
											>
												<RotateCcw className="transition-transform duration-100 group-focus-within:-rotate-45 group-hover:-rotate-45" />
											</Button>
										}
										onConfirm={onCodeReset}
									/>
								</div>
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

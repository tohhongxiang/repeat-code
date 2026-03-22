import Editor, { useMonaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

import { HIGHLIGHT_THEME, highlighter } from "@/lib/syntax-highlighter/shiki";

import { useTheme } from "../../lib/theme/provider";

interface MonacoEditorProps {
	language?: string | undefined;
}

export default function MonacoEditor({ language }: MonacoEditorProps) {
	const { theme } = useTheme();
	const monaco = useMonaco();

	useEffect(() => {
		if (!monaco) {
			return;
		}

		shikiToMonaco(highlighter, monaco);
	}, [monaco]);

	if (!monaco) {
		return (
			<div className="flex min-h-0 flex-1 flex-col items-center justify-center">
				<LoaderCircle className="size-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="min-h-0 flex-1">
			<Editor
				height="100%"
				language={language}
				theme={
					theme === "light"
						? HIGHLIGHT_THEME.LIGHT
						: HIGHLIGHT_THEME.DARK
				}
				options={{ minimap: { enabled: false } }}
			/>
		</div>
	);
}

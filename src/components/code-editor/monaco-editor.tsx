import Editor, { useMonaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

import { HIGHLIGHT_THEME, highlighter } from "@/lib/syntax-highlighter/shiki";

import { useTheme } from "../../lib/theme/provider";

interface MonacoEditorProps {
	language?: string | undefined;
	code?: string | undefined;
	onCodeChange?: (value: string) => void;
}

export default function MonacoEditor({
	language,
	code,
	onCodeChange,
}: MonacoEditorProps) {
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
				value={code}
				onChange={(value) => onCodeChange?.(value ?? "")}
				options={{
					minimap: { enabled: false },
					tabSize: 4,
					fontSize: 16,
				}}
			/>
		</div>
	);
}

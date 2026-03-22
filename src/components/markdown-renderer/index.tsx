import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import CodeBlock from "@/components/markdown-renderer/code-block";
import { HIGHLIGHT_THEME, highlighter } from "@/lib/shiki";

export default function MarkdownRenderer({ text }: { text: string }) {
	return (
		<div className="prose dark:prose-invert">
			<Markdown
				components={{ pre: CodeBlock }}
				remarkPlugins={[remarkMath]}
				rehypePlugins={[
					rehypeKatex,
					[
						rehypeShikiFromHighlighter,
						highlighter,
						{
							themes: {
								light: HIGHLIGHT_THEME.LIGHT,
								dark: HIGHLIGHT_THEME.DARK,
							},
							defaultColor: false,
						},
					],
				]}
			>
				{text}
			</Markdown>
		</div>
	);
}

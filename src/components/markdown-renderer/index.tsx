import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import CodeBlock from "@/components/markdown-renderer/code-block";
import { HIGHLIGHT_THEME, highlighter } from "@/lib/syntax-highlighter/shiki";
import { cn } from "@/lib/utils";

export default function MarkdownRenderer({
	text,
	...props
}: { text: string } & React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>) {
	return (
		<div
			{...props}
			className={cn("prose dark:prose-invert", props.className)}
		>
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

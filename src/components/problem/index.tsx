import MarkdownRenderer from "@/components/markdown-renderer";
import { ScrollArea } from "@/components/ui/scroll-area";

import CodeEditor from "../code-editor";

const problem = {
	id: "1",
	title: "Two Sum",
	description: `
This is a _test_ description to check $O(\\sqrt{n})$ whether **markdown** works
- 1
- 2
- 3

\`\`\`py
def foo():
    # This is a really really long comment that should exceed the output and do something lorem ipusums asdf iewrqnsdf 
    return "bar"
\`\`\`

The sum of things:

$$
\\sum_{i=1}^{n} \\frac{1}{n} = \\frac{\\pi^2}{4}
$$

And some additional code

\`\`\`sh
bun run dev
bun run db:push
\`\`\`


With more stuff:

\`\`\`tsx
import { codeToHtml } from "shiki";

export default async function Code() {
  const html = await codeToHtml("const a = 1 + 3", {
    lang: "javascript",
    theme: "nord",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
\`\`\`

## Subheading

This is some text again
`,
};

export default function ProblemLayout() {
	return (
		<div className="flex h-full flex-1 flex-row gap-2 p-4 pt-0">
			<ScrollArea className="max-w-prose rounded-md border p-4">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-semibold">
						{problem.id}. {problem.title}
					</h1>
					<MarkdownRenderer text={problem.description} />
				</div>
			</ScrollArea>
			<div className="flex flex-1 flex-col rounded-md border">
				<CodeEditor />
				<div className="p-4">
					<p>Test case editor</p>
				</div>
			</div>
		</div>
	);
}

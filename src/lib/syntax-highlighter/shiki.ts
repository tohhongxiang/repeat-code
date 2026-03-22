import javascript from "@shikijs/langs/javascript";
import python from "@shikijs/langs/python";
import shellscript from "@shikijs/langs/shellscript";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import ayuLight from "@shikijs/themes/ayu-light";
import oneDarkPro from "@shikijs/themes/one-dark-pro";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export const HIGHLIGHT_THEME = {
	LIGHT: "ayu-light",
	DARK: "one-dark-pro",
};

// Using the default rehype-shiki (https://shiki.style/packages/rehype) requires async markdown
// We want sync markdown, so we use the core sync highlighter
export const highlighter = createHighlighterCoreSync({
	themes: [ayuLight, oneDarkPro],
	langs: [python, typescript, tsx, javascript, shellscript],
	engine: createJavaScriptRegexEngine(),
});

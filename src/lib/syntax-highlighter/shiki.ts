import javascript from "@shikijs/langs/javascript";
import python from "@shikijs/langs/python";
import shellscript from "@shikijs/langs/shellscript";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import oneDarkPro from "@shikijs/themes/one-dark-pro";
import oneLight from "@shikijs/themes/one-light";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export const HIGHLIGHT_THEME = {
	LIGHT: "one-light",
	DARK: "one-dark-pro",
};

// Using the default rehype-shiki (https://shiki.style/packages/rehype) requires async markdown
// We want sync markdown, so we use the core sync highlighter
export const highlighter = createHighlighterCoreSync({
	themes: [oneLight, oneDarkPro],
	langs: [python, typescript, tsx, javascript, shellscript],
	engine: createJavaScriptRegexEngine(),
});

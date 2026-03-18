//  @ts-check
import js from "@eslint/js";
import { tanstackConfig } from "@tanstack/eslint-config";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = [
	...tanstackConfig,
	js.configs.recommended,
	...(tseslint.configs.recommended ?? []),
	pluginReact.configs.flat.recommended,
	reactHooks.configs.flat.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	{
		rules: {
			"no-shadow": "off",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
];

export default config;

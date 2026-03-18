//  @ts-check

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig}  */
const config = {
	useTabs: true,
	tabWidth: 4,
	printWidth: 80,
	trailingComma: "all",
	semi: true,
	singleQuote: false,

	/** prettier-plugin-tailwindcss */
	tailwindStylesheet: "./src/styles.css",
	tailwindFunctions: ["cva", "cn"],

	/** @trivago/prettier-plugin-sort-imports */
	importOrder: ["^@/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,

	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
};

export default config;

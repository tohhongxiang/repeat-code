import { languageSchema } from "./types";

export default async function getLanguages() {
	await new Promise((res) => setTimeout(res, 200));

	const result = [
		{ id: "1", name: "Python (3.8.1)", judge0Id: 71, monacoId: "python" },
		{
			id: "2",
			name: "TypeScript (3.7.4)",
			judge0Id: 74,
			monacoId: "typescript",
		},
		{
			id: "3",
			name: "JavaScript (Node.js 12.14.0)",
			judge0Id: 63,
			monacoId: "javascript",
		},
	];

	return result.map((result) => languageSchema.parse(result));
}

export default async function getLanguages() {
	await new Promise((res) => setTimeout(res, 200));

	return [
		{ id: "1", label: "Python 3", monacoValue: "python" },
		{ id: "2", label: "Typescript", monacoValue: "typescript" },
		{ id: "3", label: "Javascript", monacoValue: "javascript" },
	];
}

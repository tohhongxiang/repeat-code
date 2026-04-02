import { languages } from "./data";
import { languageSchema } from "./types";

export default async function getLanguages() {
	await new Promise((res) => setTimeout(res, 200));

	return languages.map((l) => languageSchema.parse(l));
}

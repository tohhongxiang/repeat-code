import { languages } from "./data";
import type { Language } from "./types";

export default async function getLanguage(languageID: Language["id"]) {
	await new Promise((res) => setTimeout(res, 1000));
	return languages.find((l) => l.id === languageID);
}

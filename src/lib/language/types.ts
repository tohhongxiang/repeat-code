import z from "zod";

export const languageSchema = z.object({
	id: z.string(),
	name: z.string(),
	judge0Id: z.number(),
	monacoId: z.string(),
});

export type Language = z.infer<typeof languageSchema>;

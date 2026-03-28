import z from "zod";

export const testCaseSchema = z.object({
	inputs: z.array(
		z.object({
			name: z.string().min(1, { error: "Name is required" }),
			value: z.string().min(1, { error: "Value is required" }),
		}),
	),
});

export type TestCase = z.infer<typeof testCaseSchema>;

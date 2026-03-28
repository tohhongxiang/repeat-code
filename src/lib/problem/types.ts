import z from "zod";

import { languageSchema } from "../language/types";

export const DIFFICULTIES = {
	EASY: "easy",
	MEDIUM: "medium",
	HARD: "hard",
} as const;

export const topicSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
});

export const problemSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	difficulty: z.enum(DIFFICULTIES),
	description: z.string(),
	examples: z.array(
		z.object({
			input: z.string(),
			output: z.string(),
			explanation: z.string().optional(),
		}),
	),
	constraints: z.array(z.string()),
	followUps: z.array(z.string()),
	topics: z.array(topicSchema),
	hints: z.array(z.string()),
	starterCode: z.array(
		z.object({
			language: languageSchema,
			code: z.string(),
		}),
	),
	testCases: z.array(
		z.object({
			inputs: z.array(
				z.object({
					name: z.string().min(1),
					value: z.string().min(1),
				}),
			),
			expected: z.string(),
		}),
	),
});

export type Problem = z.infer<typeof problemSchema>;

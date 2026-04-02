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

export const testCaseSchema = z.object({
	operations: z.array(z.string()),
	arguments: z.array(z.array(z.json())),
	expected: z.array(z.json()),
});

export type TestCase = z.infer<typeof testCaseSchema>;

const VALID_TYPES = [
	"void",
	"int",
	"int[]",
	"int[][]",
	"float",
	"float[]",
	"float[][]",
	"boolean",
	"boolean[]",
	"boolean[][]",
	"string",
	"string[]",
	"string[][]",
	"ListNode",
	"TreeNode",
];

export const VALIDATORS = {
	EXACT_MATCH: "EXACT_MATCH",
	ANY_ORDER: "ANY_ORDER",
} as const;

export type ProblemValidator = (typeof VALIDATORS)[keyof typeof VALIDATORS];

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
	api: z.object({
		entry: z.object({
			type: z.enum(["class", "method"]), // function/class problem
			name: z.string(), // logical function name
		}),
		methods: z.array(
			z.object({
				name: z.string(),
				parameters: z.array(
					z.object({ name: z.string(), type: z.enum(VALID_TYPES) }),
				),
				returnType: z.enum(VALID_TYPES).optional(),
			}),
		),
	}),
	execution: z.object({
		validator: z.enum(VALIDATORS),
	}),
	testCases: z.array(testCaseSchema),
	referenceSolution: z.object({ languageID: z.string(), code: z.string() }),
});

export type Problem = z.infer<typeof problemSchema>;

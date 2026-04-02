import z from "zod";

export const JUDGE0_STATUSES = {
	IN_QUEUE: 1,
	PROCESSING: 2,
	ACCEPTED: 3,
	WRONG_ANSWER: 4,
	TIME_LIMIT_EXCEEDED: 5,
	COMPILATION_ERROR: 6,
	RUNTIME_ERROR_SIGSEGV: 7,
	RUNTIME_ERROR_SIGXFSZ: 8,
	RUNTIME_ERROR_SIGFPE: 9,
	RUNTIME_ERROR_SIGABRT: 10,
	RUNTIME_ERROR_NZEC: 11,
	RUNTIME_ERROR_OTHER: 12,
	INTERNAL_ERROR: 13,
	EXEC_FORMAT_ERROR: 14,
} as const;

const SubmissionResponseSchema = z.object({
	stdout: z.string().nullable(),
	stderr: z.string().nullable(),
	compile_output: z.string().nullable(),
	message: z.string().nullable(),
	status: z.object({
		id: z.enum(JUDGE0_STATUSES),
		description: z.string(),
	}),
	token: z.string(),
	time: z.coerce.number().nullable(), // judge0 returns this as a string, we coerce into a number
	memory: z.number().nullable(),
});

export type SubmissionResponse = z.infer<typeof SubmissionResponseSchema>;

export default async function getSubmission(token: string) {
	const response = await fetch(`https://ce.judge0.com/submissions/${token}`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(`Judge0 get submission failed: ${response.status}`);
	}

	const data = await response.json();
	return SubmissionResponseSchema.parse(data);
}

// {
//   "stdout": "Hello world\n",
//   "time": "0.011",
//   "memory": 3864,
//   "stderr": null,
//   "token": "04d30b81-13d3-426c-bba8-4c79f1541e7f",
//   "compile_output": null,
//   "message": null,
//   "status": {
//     "id": 3,
//     "description": "Accepted"
//   }
// }

// {
//   "stdout": null,
//   "time": "0.01",
//   "memory": 3432,
//   "stderr": "Traceback (most recent call last):\n  File \"script.py\", line 1, in <module>\n    print(x)\nNameError: name 'x' is not defined\n",
//   "token": "487997b7-0065-4825-b0b2-b6e74d98881c",
//   "compile_output": null,
//   "message": "Exited with error status 1",
//   "status": {
//     "id": 11,
//     "description": "Runtime Error (NZEC)"
//   }
// }

// {
//   "stdout": null,
//   "time": "5.073",
//   "memory": 4028,
//   "stderr": null,
//   "token": "62bc20f2-c30a-4f85-ba44-2e79b0f18fb0",
//   "compile_output": null,
//   "message": "Time limit exceeded",
//   "status": {
//     "id": 5,
//     "description": "Time Limit Exceeded"
//   }
// }

import { problemSchema } from "./types";
import type { Problem } from "./types";

export default async function getProblem(id: Problem["id"]) {
	await new Promise((res) => setTimeout(res, 200));
	const result = {
		id,
		slug: "two-sum",
		title: "Two Sum",
		difficulty: "easy",
		description: `Given an array of integers \`nums\` and an integer \`target\`, return _indices_ of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.        
`,
		examples: [
			{
				input: "nums = [2,7,11,15], target = 9",
				output: "[0,1]",
				explanation:
					"Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.",
			},
			{
				input: "nums = [3,2,4], target = 6",
				output: "[1,2]",
			},
			{
				input: "nums = [3,3], target = 6",
				output: "[0,1]",
			},
		],
		constraints: [
			"$2$ <= `nums.length` <= $10^4$",
			"$-10^9$ <= `nums[i]` <= $10^9$",
			"$-10^9$ <= target <= $10^9$",
			"Only **one** valid answer exists.",
		],
		followUps: [
			"Can you come up with an algorithm that is less than $O(n^2)$ time ",
		],
		topics: [
			{ id: "1", name: "Hash Table", slug: "hash-table" },
			{ id: "2", name: "Array", slug: "array" },
		],
		hints: [
			"A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions just for completeness. It is from these brute force solutions that you can come up with optimizations.",
			"So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
			"The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?",
		],
		starterCode: [
			{
				language: {
					id: "1",
					name: "Python (3.8.1)",
					judge0Id: 71,
					monacoId: "python",
				},
				code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
		
`,
			},
			{
				language: {
					id: "2",
					name: "TypeScript (3.7.4)",
					judge0Id: 74,
					monacoId: "typescript",
				},
				code: `function twoSum(nums: number[], target: number): number[] {
    
};
`,
			},
			{
				language: {
					id: "3",
					name: "JavaScript (Node.js 12.14.0)",
					judge0Id: 63,
					monacoId: "javascript",
				},
				code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
			},
		],
		testCases: [
			{
				inputs: [
					{
						name: "nums",
						value: "[1, 2, 3, 4, 5]",
					},
					{ name: "target", value: "6" },
				],
				expected: "[0, 4]",
			},
			{
				inputs: [
					{ name: "nums", value: "[1, 2]" },
					{ name: "target", value: "3" },
				],
				expected: "[0, 1]",
			},
			{
				inputs: [
					{ name: "nums", value: "[1, 2, 3, 6]" },
					{ name: "target", value: "5" },
				],
				expected: "[1, 2]",
			},
		],
	};

	return problemSchema.parse(result);
}

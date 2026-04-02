import { VALIDATORS, problemSchema } from "./types";
import type { Problem } from "./types";

const twoSum: Problem = {
	id: "1",
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
	api: {
		entry: {
			type: "method",
			name: "twoSum",
		},
		methods: [
			{
				name: "twoSum",
				parameters: [
					{ name: "nums", type: "int[]" },
					{ name: "target", type: "int" },
				],
				returnType: "int[]",
			},
		],
	},
	execution: {
		validator: VALIDATORS.ANY_ORDER,
	},
	testCases: [
		{
			operations: ["twoSum"],
			arguments: [[[1, 2, 3, 4, 5], 9]],
			expected: [[3, 4]],
		},
		{
			operations: ["twoSum"],
			arguments: [[[1, 2, 3, 6], 5]],
			expected: [[1, 2]],
		},
	],
	referenceSolution: {
		languageID: "1",
		code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}

        for i in range(len(nums)):
            if target - nums[i] in seen:
                return i, seen[target - nums[i]]

            seen[nums[i]] = i

        return -1
`,
	},
};

const designLRUCache: Problem = {
	id: "2",
	slug: "design-lru-cache",
	title: "Design LRU Cache",
	difficulty: "medium",
	description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in $O(1)$ average time complexity..        
`,
	examples: [
		{
			input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
			output: `[null, null, null, 1, null, -1, null, -1, 3, 4]`,
			explanation: `For each operation:
\`\`\`
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
\`\`\``,
		},
	],
	constraints: [
		"1 <= capacity <= 3000",
		"0 <= key <= $10^4$",
		"0 <= value <= $10^5$",
		"At most $2 * 10^5$ calls will be made to `get` and `put`.",
	],
	followUps: [],
	topics: [
		{ id: "1", name: "Hash Table", slug: "hash-table" },
		{ id: "2", name: "Linked List", slug: "linked-list" },
		{ id: "2", name: "Design", slug: "design" },
		{ id: "2", name: "Doubly-Linked list", slug: "doubly-linked-list" },
	],
	hints: [],
	starterCode: [
		{
			language: {
				id: "1",
				name: "Python (3.8.1)",
				judge0Id: 71,
				monacoId: "python",
			},
			code: `class LRUCache:

    def __init__(self, capacity: int):
        

    def get(self, key: int) -> int:
        

    def put(self, key: int, value: int) -> None:
        


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)`,
		},
		{
			language: {
				id: "2",
				name: "TypeScript (3.7.4)",
				judge0Id: 74,
				monacoId: "typescript",
			},
			code: `class LRUCache {
    constructor(capacity: number) {
        
    }

    get(key: number): number {
        
    }

    put(key: number, value: number): void {
        
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */`,
		},
		{
			language: {
				id: "3",
				name: "JavaScript (Node.js 12.14.0)",
				judge0Id: 63,
				monacoId: "javascript",
			},
			code: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */`,
		},
	],
	api: {
		entry: {
			type: "class",
			name: "LRUCache",
		},
		methods: [
			{
				name: "LRUCache",
				parameters: [{ name: "capacity", type: "int" }],
				returnType: "void",
			},
			{
				name: "get",
				parameters: [{ name: "key", type: "int" }],
				returnType: "int",
			},
			{
				name: "set",
				parameters: [
					{ name: "key", type: "int" },
					{ name: "value", type: "int" },
				],
				returnType: "void",
			},
		],
	},
	execution: {
		validator: VALIDATORS.EXACT_MATCH,
	},
	testCases: [
		{
			operations: [
				"LRUCache",
				"put",
				"put",
				"get",
				"put",
				"get",
				"put",
				"get",
				"get",
				"get",
			],
			arguments: [
				[2],
				[1, 1],
				[2, 2],
				[1],
				[3, 3],
				[2],
				[4, 4],
				[1],
				[3],
				[4],
			],
			expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
		},
	],
	referenceSolution: {
		languageID: "1",
		code: `class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.max_capacity = capacity
        self.values = {}
        self.left = Node(0, 0)
        self.right = Node(0, 0)
        self.left.next = self.right
        self.right.prev = self.left

    def remove(self, node):
        node.prev.next, node.next.prev = node.next, node.prev

    def add(self, node):
        old = self.right.prev

        node.prev = old
        node.next = self.right

        old.next = node
        self.right.prev = node

    def get(self, key: int) -> int:
        if key not in self.values:
            return -1

        node = self.values[key]
        self.remove(node)
        self.add(node)

        return node.val

    def put(self, key: int, value: int) -> None:
        if key not in self.values:
            self.values[key] = Node(key, value)
            self.add(self.values[key])
        else:
            self.values[key].val = value
            node = self.values[key]
            self.remove(node)
            self.add(node)

        while len(self.values) > self.max_capacity:
            node = self.left.next
            self.remove(node)
            del self.values[node.key]

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)`,
	},
};

const problems = [twoSum, designLRUCache];

export default async function getProblem(id: Problem["id"]) {
	await new Promise((res) => setTimeout(res, 200));
	console.log("ID", id);

	const result = problems[0];

	if (!result) {
		throw new Error("Problem not found");
	}

	return problemSchema.parse(result);
}

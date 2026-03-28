import { useQuery } from "@tanstack/react-query";

import getProblem from "@/lib/problem/get-problem";

import CodeEditor from "../code-editor";
import Loading from "./loading";
import ProblemConsole from "./problem-console";
import type { TestCase } from "./problem-console/types";
import ProblemDetailsPanel from "./problem-details-panel";
import useProblemCodeEditor from "./use-problem-code-editor";

export default function ProblemLayout() {
	const {
		data: problem,
		isPending,
		error,
	} = useQuery({
		queryKey: ["problem", "1"],
		queryFn: () => getProblem("1"),
	});

	const {
		availableLanguages,
		code,
		setCode,
		resetCodeToStarterCode,
		selectedLanguage,
		setSelectedLanguageID,
	} = useProblemCodeEditor(problem);

	const handleRun = async (testCases: Array<TestCase>) => {
		console.log({ problem, testCases, code, selectedLanguage });
		await new Promise((res) => setTimeout(res, 2000));
	};

	const handleSubmit = async () => {
		await new Promise((res) => setTimeout(res, 2000));
		console.log("Submit");
	};

	if (isPending) {
		return <Loading />;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	if (!problem) {
		return <p>Problem not found</p>;
	}

	return (
		<div className="flex h-full min-h-0 flex-1 flex-row gap-2 p-4 pt-0">
			<ProblemDetailsPanel problem={problem} />
			<div className="flex flex-1 flex-col rounded-md border">
				<CodeEditor
					availableLanguages={availableLanguages}
					selectedLanguage={selectedLanguage}
					onSelectedLanguageChange={setSelectedLanguageID}
					code={code}
					onCodeChange={setCode}
					onCodeReset={resetCodeToStarterCode}
				/>
				<div className="p-2">
					<ProblemConsole
						initialTestCases={problem.testCases}
						onRun={handleRun}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}

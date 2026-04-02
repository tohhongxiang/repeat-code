import CodeEditor from "../code-editor";
import ErrorDisplay from "../error-display";
import useProblemQuery from "./hooks/use-problem";
import useProblemCodeEditor from "./hooks/use-problem-code-editor";
import useProblemRunner from "./hooks/use-problem-runner";
import useProblemSubmitter from "./hooks/use-problem-submitter";
import Loading from "./loading";
import ProblemActionBar from "./problem-action-bar";
import ProblemConsole from "./problem-console";
import useProblemConsoleState from "./problem-console/hooks/use-problem-console-state";
import useProblemTestCaseEditor from "./problem-console/test-case-editor/use-problem-test-case-editor";
import ProblemDetailsPanel from "./problem-details-panel";

export default function ProblemLayout() {
	const {
		data: problem,
		isPending: isLoadingProblem,
		error: loadProblemError,
	} = useProblemQuery("1");
	const editor = useProblemCodeEditor(problem);
	const testCaseEditor = useProblemTestCaseEditor(problem);
	const consoleState = useProblemConsoleState();
	const problemRunner = useProblemRunner({
		problem,
		code: editor.code,
		selectedLanguage: editor.selectedLanguage,
		testCaseEditor,
		onRunStart: () => consoleState.setCurrentTab(consoleState.tabs.OUTPUT),
	});

	const problemSubmitter = useProblemSubmitter();

	if (isLoadingProblem) {
		return <Loading />;
	}

	if (loadProblemError) {
		return <ErrorDisplay error={loadProblemError} />;
	}

	if (!problem) {
		return <p>Problem not found</p>;
	}

	return (
		<div className="flex h-full min-h-0 flex-1 flex-row gap-2 p-4 pt-0">
			<ProblemDetailsPanel problem={problem} />
			<div className="flex flex-1 flex-col rounded-md border">
				<CodeEditor
					availableLanguages={editor.availableLanguages}
					selectedLanguage={editor.selectedLanguage}
					onSelectedLanguageChange={editor.setSelectedLanguageID}
					code={editor.code}
					onCodeChange={editor.setCode}
					onCodeReset={editor.resetCodeToStarterCode}
				/>
				<div className="p-2">
					<ProblemConsole
						consoleState={consoleState}
						testCaseEditor={testCaseEditor}
						problemRunner={problemRunner}
					/>
					<ProblemActionBar
						onRun={problemRunner.run}
						onSubmit={problemSubmitter.submit}
						isRunning={problemRunner.isRunning}
						isSubmitting={problemSubmitter.isRunning}
						isDisabled={
							problemSubmitter.isRunning ||
							problemRunner.isRunning
						}
					/>
				</div>
			</div>
		</div>
	);
}

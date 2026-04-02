import LoadingIndicator from "@/components/loading-indicator";
import { Button } from "@/components/ui/button";

interface ProblemActionBarProps {
	onRun?: () => void;
	onSubmit?: () => void;
	isRunning?: boolean;
	isSubmitting?: boolean;
	isDisabled?: boolean;
}

export default function ProblemActionBar({
	onRun,
	onSubmit,
	isRunning,
	isSubmitting,
	isDisabled,
}: ProblemActionBarProps) {
	return (
		<div className="flex flex-row items-center justify-end gap-2 pt-2">
			<Button
				size="lg"
				variant="secondary"
				onClick={onRun}
				disabled={isDisabled}
			>
				{isRunning ? (
					<>
						<LoadingIndicator />
						<span>Running...</span>
					</>
				) : (
					"Run"
				)}
			</Button>
			<Button size="lg" onClick={onSubmit} disabled={isDisabled}>
				{isSubmitting ? (
					<>
						<LoadingIndicator />
						<span>Submitting...</span>
					</>
				) : (
					"Submit"
				)}
			</Button>
		</div>
	);
}

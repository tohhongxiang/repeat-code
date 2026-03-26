import { Loader2 } from "lucide-react";
import { forwardRef, isValidElement } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import extractErrorMessage from "./extract-error-message";
import { useConfirmationDialogReducer } from "./reducer";

interface ConfirmationDialogProps {
	trigger: string | React.ReactNode;

	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	variant?: "default" | "destructive";

	confirmButtonText?: string;
	confirmButtonIcon?: React.ReactNode;
	onConfirm?: () => Promise<void> | void;

	cancelButtonText?: string;
	onCancel?: () => void;
}

export default forwardRef(function ConfirmationDialog(
	{
		trigger,
		title,
		description,
		variant = "destructive",
		confirmButtonText = "Confirm",
		confirmButtonIcon,
		cancelButtonText = "Cancel",
		onConfirm,
		onCancel,
	}: ConfirmationDialogProps,
	ref: React.Ref<HTMLButtonElement> | undefined,
) {
	const { state, actions } = useConfirmationDialogReducer();

	const handleCancel = () => {
		onCancel?.();
		actions.close();
	};

	const handleConfirm = async () => {
		if (state.loading) {
			return;
		}

		actions.confirmStart();

		try {
			await onConfirm?.();
			actions.confirmSuccess();
		} catch (e) {
			actions.confirmError(extractErrorMessage(e));
		}
	};

	return (
		<Dialog
			open={state.open}
			onOpenChange={(open) => (open ? actions.open() : actions.close())}
		>
			{isValidElement(trigger) ? (
				<DialogTrigger render={trigger} ref={ref} />
			) : (
				<DialogTrigger ref={ref}>{trigger}</DialogTrigger>
			)}
			<DialogContent>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
					{state.error && (
						<DialogDescription
							className="text-destructive"
							role="alert"
						>
							{state.error}
						</DialogDescription>
					)}
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						disabled={state.loading}
						onClick={handleCancel}
					>
						{cancelButtonText}
					</Button>
					<Button
						variant={variant}
						onClick={handleConfirm}
						disabled={state.loading}
						aria-busy={state.loading}
					>
						{state.loading ? (
							<Loader2
								className="animate-spin"
								aria-label="Loading"
							/>
						) : (
							confirmButtonIcon
						)}
						{confirmButtonText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});

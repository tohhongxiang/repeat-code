const DEFAULT_ERROR_MESSAGE = "Something went wrong.";
export default function extractErrorMessage(
	error: unknown,
	defaultErrorMessage = DEFAULT_ERROR_MESSAGE,
) {
	return error instanceof Error ? error.message : defaultErrorMessage;
}

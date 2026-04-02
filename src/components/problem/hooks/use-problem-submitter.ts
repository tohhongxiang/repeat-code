import { useState } from "react";

export default function useProblemSubmitter() {
	const [isRunning, setIsRunning] = useState(false);
	const submit = async () => {
		setIsRunning(true);
		await new Promise((res) => setTimeout(res, 2000));
		setIsRunning(false);
	};

	return {
		isRunning,
		submit,
	};
}

import { useCallback, useEffect, useState } from "react";

export default function useLocalStorageState<T>(
	key: string | undefined | null,
	defaultValue: T,
	{ debounceDurationMs = 300 }: { debounceDurationMs?: number } = {},
) {
	const readValue = useCallback(() => {
		// In SSR environments, typeof window === "undefined", and we do not have localStorage
		if (!key || typeof window === "undefined") {
			return defaultValue;
		}

		try {
			const stored = localStorage.getItem(key);
			return stored ? (JSON.parse(stored) as T) : defaultValue;
		} catch {
			return defaultValue;
		}
	}, [defaultValue, key]);

	const [state, setState] = useState<T>(readValue);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronising with localStorage
		setState(readValue());
	}, [key, readValue]);

	useEffect(() => {
		if (!key) {
			return;
		}

		const id = setTimeout(() => {
			try {
				localStorage.setItem(key, JSON.stringify(state));
			} catch {
				// ignore write failures
			}
		}, debounceDurationMs);

		return () => clearTimeout(id);
	}, [key, state, debounceDurationMs]);

	return [state, setState] as const;
}

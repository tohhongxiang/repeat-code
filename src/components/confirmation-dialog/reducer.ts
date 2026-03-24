import { useCallback, useReducer } from "react";

type State = {
	open: boolean;
	loading: boolean;
	error: string | null;
};

const initialState: State = {
	open: false,
	loading: false,
	error: null,
};

const ACTIONS = {
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	CONFIRM_START: "CONFIRM_START",
	CONFIRM_SUCCESS: "CONFIRM_SUCCESS",
	CONFIRM_ERROR: "CONFIRM_ERROR",
} as const;

type Action =
	| { type: typeof ACTIONS.OPEN }
	| { type: typeof ACTIONS.CLOSE }
	| { type: typeof ACTIONS.CONFIRM_START }
	| { type: typeof ACTIONS.CONFIRM_SUCCESS }
	| { type: typeof ACTIONS.CONFIRM_ERROR; message: string };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case ACTIONS.OPEN:
			return { ...state, open: true, error: null };

		case ACTIONS.CLOSE:
			return initialState;

		case ACTIONS.CONFIRM_START:
			return { ...state, loading: true, error: null };

		case ACTIONS.CONFIRM_SUCCESS:
			return initialState;

		case ACTIONS.CONFIRM_ERROR:
			return {
				...state,
				loading: false,
				error: action.message,
			};

		default:
			return state;
	}
}

export function useConfirmationDialogReducer() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const open = useCallback(() => {
		dispatch({ type: ACTIONS.OPEN });
	}, []);

	const close = useCallback(() => {
		dispatch({ type: ACTIONS.CLOSE });
	}, []);

	const confirmStart = useCallback(() => {
		dispatch({ type: ACTIONS.CONFIRM_START });
	}, []);

	const confirmSuccess = useCallback(() => {
		dispatch({ type: ACTIONS.CONFIRM_SUCCESS });
	}, []);

	const confirmError = useCallback((message: string) => {
		dispatch({ type: ACTIONS.CONFIRM_ERROR, message });
	}, []);

	return {
		state,
		actions: { open, close, confirmStart, confirmSuccess, confirmError },
	};
}

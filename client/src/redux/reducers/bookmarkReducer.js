const initialState = {
	loading: false,
	bookmarks: {},
	error: "",
};

const bookmarkReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "bookmarks/get":
			return { ...state, loading: false, bookmarks: payload };
		case "bookmarks/loading":
			return { ...state, loading: true };
		case "bookmarks/error":
			return { ...state, loading: false, err: payload };
		default:
			return state;
	}
};

export default bookmarkReducer;

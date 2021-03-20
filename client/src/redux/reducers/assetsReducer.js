const initialState = {
	loading: false,
	assets: [],
	error: "",
};

const assetsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "assets/get":
			return { ...state, loading: false, assets: payload };
		case "assets/loading":
			return { ...state, loading: true };
		case "assets/error":
			return { ...state, loading: false, err: payload };
		default:
			return state;
	}
};

export default assetsReducer;

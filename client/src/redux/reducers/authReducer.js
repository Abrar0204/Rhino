const initialState = {
	loading: false,
	accessToken: localStorage.getItem("accessToken") || "",
	error: "",
	user: {},
	allUser: [],
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "auth/token":
			return { ...state, accessToken: payload, loading: false };
		case "auth/loading":
			return { ...state, loading: true };
		case "auth/error":
			return { ...state, error: payload, loading: false };
		case "auth/user":
			return { ...state, user: payload };
		case "auth/user/all":
			return { ...state, allUser: payload };
		case "auth/signout":
			return { ...state, user: {}, allUser: [], accessToken: "" };
		default:
			return state;
	}
};

export default authReducer;

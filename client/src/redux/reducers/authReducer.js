const initialState = {
	loading: false,
	accessToken: localStorage.getItem("accessToken") || "",
	error: "",
	user: {},
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
		case "auth/signout":
			return { ...state, user: {}, accessToken: "" };
		default:
			return state;
	}
};

export default authReducer;

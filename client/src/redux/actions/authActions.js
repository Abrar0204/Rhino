import axios from "axios";

export const loginAction = (email, password, history) => async dispatch => {
	try {
		dispatch({ type: "auth/loading" });
		const { data } = await axios.post("/api/auth/login", {
			email,
			password,
		});
		localStorage.setItem("accessToken", data.accessToken);
		dispatch({ type: "auth/token", payload: data.accessToken });
		history.push("/projects");
	} catch (err) {
		console.log(err);
		dispatch({ type: "auth/error", payload: err.message });
	}
};

export const registerAction = (
	username,
	email,
	password,
	history
) => async dispatch => {
	try {
		dispatch({ type: "auth/loading" });
		const { data } = await axios.post("/api/auth/register", {
			username,
			email,
			password,
		});
		localStorage.setItem("accessToken", data.accessToken);
		dispatch({ type: "auth/token", payload: data.accessToken });
		history.push("/projects");
	} catch (err) {
		console.log(err);
		dispatch({ type: "auth/error", payload: err.message });
	}
};

export const signOutAction = () => {
	localStorage.removeItem("accessToken");
	return { type: "auth/signout" };
};

export const getUser = () => async (dispatch, getState) => {
	try {
		if (getState().auth.accessToken) {
			dispatch({ type: "auth/loading" });
			const { data } = await axios.get("/api/auth/user", {
				headers: {
					Authorization: `Bearer ${getState().auth.accessToken} `,
				},
			});
			dispatch({ type: "auth/user", payload: data });
		}
		dispatch({ type: "auth/error", payload: "Access Token not found" });
	} catch (err) {
		console.log(err);
		dispatch({ type: "auth/error", payload: err.message });
	}
};

export const getAllUsers = () => async (dispatch, getState) => {
	try {
		if (getState().auth.accessToken) {
			dispatch({ type: "auth/loading" });
			const { data } = await axios.get("/api/auth/users", {
				headers: {
					Authorization: `Bearer ${getState().auth.accessToken} `,
				},
			});
			dispatch({ type: "auth/user/all", payload: data });
		}
		dispatch({ type: "auth/error", payload: "Access Token not found" });
	} catch (err) {
		console.log(err);
		dispatch({ type: "auth/error", payload: err.message });
	}
};

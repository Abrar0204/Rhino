import axios from "axios";

export const getAssets = id => async (dispatch, getState) => {
	try {
		dispatch({ type: "assets/loading" });
		const accessToken = getState().auth.accessToken;
		const { data } = await axios.get(`/api/projects/assets/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken} `,
			},
		});
		console.log(data);
		dispatch({ type: "assets/get", payload: data?.assets || null });
	} catch (err) {
		dispatch({ type: "assets/error", payload: err.message });
	}
};

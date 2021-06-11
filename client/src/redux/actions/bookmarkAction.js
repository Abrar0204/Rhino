import axios from "axios";

export const getBookmarks = id => async (dispatch, getState) => {
	try {
		dispatch({ type: "bookmarks/loading" });
		const accessToken = getState().auth.accessToken;
		const { data } = await axios.get(`/api/bookmarks/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken} `,
			},
		});
		console.log(data);
		dispatch({ type: "bookmarks/get", payload: data.bookmarks });
	} catch (err) {
		dispatch({ type: "bookmarks/error", payload: err.message });
	}
};

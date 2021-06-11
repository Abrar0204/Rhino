import axios from "axios";

const getTasks = id => async (dispatch, getState) => {
	try {
		dispatch({ type: "tasks/loading" });
		const accessToken = getState().auth.accessToken;
		const { data } = await axios.get(`/api/projects/timeline/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken} `,
			},
		});

		dispatch({ type: "tasks/get", payload: data.tasks });
	} catch (err) {
		dispatch({ type: "tasks/error", payload: err.message });
	}
};

const updateTasks = (id, task) => async (dispatch, getState) => {
	try {
		dispatch({ type: "tasks/loading" });
		// console.log(task);
		const accessToken = getState().auth.accessToken;
		const { data } = await axios.post(
			`/api/projects/timeline/${id}`,
			{ task },
			{
				headers: {
					Authorization: `Bearer ${accessToken} `,
				},
			}
		);

		dispatch({ type: "projects/update", payload: data.project });
		dispatch({ type: "tasks/update", payload: data.task });
	} catch (err) {
		dispatch({ type: "tasks/error", payload: err.message });
	}
};

export { getTasks, updateTasks };

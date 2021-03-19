import axios from "axios";

const getAllProjects = () => async dispatch => {
	try {
		dispatch({ type: "projects/loading" });
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axios.get(`/api/projects/`, {
			headers: {
				Authorization: `Bearer ${accessToken} `,
			},
		});

		dispatch({ type: "projects/get", payload: data.projects });
	} catch (err) {
		dispatch({ type: "projects/error", payload: err.message });
	}
};

const getProject = projectId => async dispatch => {
	try {
		dispatch({ type: "projects/loading" });
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axios.get(`/api/projects/${projectId}`, {
			headers: {
				Authorization: `Bearer ${accessToken} `,
			},
		});

		dispatch({ type: "projects/get/one", payload: data });
	} catch (err) {
		dispatch({ type: "projects/error", payload: err.message });
	}
};

export { getAllProjects, getProject };

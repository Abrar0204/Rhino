const initialState = {
	projects: [],
};

const projectsReducers = (state = initialState, { type, payload }) => {
	switch (type) {
		case "projects/get":
			return { ...state, projects: payload, loading: false };
		case "projects/loading":
			return { ...state, loading: true, projects: [] };
		case "projects/error":
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
};
export default projectsReducers;

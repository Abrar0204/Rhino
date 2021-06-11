const initialState = {
	loading: false,
	error: "",
	projects: [],
};

const projectsReducers = (state = initialState, { type, payload }) => {
	switch (type) {
		case "projects/get":
			return { ...state, projects: payload, loading: false };
		case "projects/loading":
			return { ...state, loading: true };
		case "projects/error":
			return { ...state, error: payload, loading: false };
		case "projects/update":
			let newProjects = state.projects.map(project => {
				if (project._id === payload._id) {
					return payload;
				}
				return project;
			});
			// console.log(newProjects);
			// return state;
			return { ...state, projects: newProjects, loading: false };
		case "projects/add":
			console.log(payload);
			console.log(state.projects);
			return {
				...state,
				loading: false,
				projects: [...state.projects, payload],
			};
		default:
			return state;
	}
};
export default projectsReducers;

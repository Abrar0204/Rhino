const initialState = {
	loading: false,
	tasks: {},
	error: "",
};
const convertToDateString = date => {
	const dateObj = new Date(parseInt(date));

	const dateString =
		addZeroInBegginning(dateObj.getDate()) +
		"/" +
		addZeroInBegginning(dateObj.getMonth() + 1) +
		"/" +
		dateObj.getFullYear().toString();

	return dateString.trim();
};
const addZeroInBegginning = (number = 0) => {
	if (number.toString().length === 1) {
		return "0" + number.toString();
	}
	return number.toString().trim();
};
const tasksReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "tasks/get":
			return { ...state, loading: false, tasks: payload };
		case "tasks/loading":
			return { ...state, loading: true };
		case "tasks/error":
			return { ...state, loading: false, err: payload };
		case "tasks/update":
			let newTasks = state.tasks;
			let startDate = payload.startDate;
			let endDate = payload.endDate;

			if (newTasks[startDate]) {
				newTasks[startDate].tasks.push(payload);
				if (newTasks[endDate]) {
					newTasks[endDate].tasks.push(payload);
				} else {
					newTasks[endDate] = {
						date: endDate,
						tasks: [payload],
					};
				}
			} else {
				newTasks[startDate] = {
					date: startDate,
					tasks: [payload],
				};
				if (newTasks[endDate]) {
					newTasks[endDate].tasks.push(payload);
				} else {
					newTasks[endDate] = {
						date: endDate,
						tasks: [payload],
					};
				}
			}

			return { ...state, loading: false, tasks: newTasks };

		default:
			return state;
	}
};

export default tasksReducer;

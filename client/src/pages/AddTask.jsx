import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/actions/tasksAction";
const AddTask = ({ id, closeModel, allUsers, user: curUser }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("low");
	const [developerEmail, setDeveloperEmail] = useState("");
	const [developers, setDevelopers] = useState([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [status, setStatus] = useState("todo");
	const [error, setError] = useState("");

	const projects = useSelector(state => state.projects.projects);
	const currentProject = projects.find(pro => pro._id === id);
	const dispatch = useDispatch();
	const setItems = e => {
		const { name, value } = e.target;

		switch (name) {
			case "title":
				return setTitle(value);
			case "description":
				return setDescription(value);
			case "priority":
				return setPriority(value);
			case "startDate":
				return setStartDate(value);
			case "endDate":
				return setEndDate(value);
			case "status":
				return setStatus(value);
			case "developers":
				return setDeveloperEmail(value);
			default:
				return;
		}
	};

	const submit = e => {
		e.preventDefault();
		let startDateString = new Date(startDate.replace(/-/g, "/"))
			.valueOf()
			.toString();

		let endDateString = new Date(endDate.replace(/-/g, "/"))
			.valueOf()
			.toString();

		let developersId = [];

		currentProject.developers.map(develop => {
			developers.forEach(dev => {
				if (dev.email.includes(develop.email)) {
					developersId.push(develop.id);
				}
			});
		});

		let task = {
			title,
			description,
			developers: developersId,
			status,
			priority,
			startDate: startDateString,
			endDate: endDateString,
		};

		dispatch(updateTasks(id, task));
		closeModel();
	};

	const checkIfEmailIsInArray = (email, array) => {
		if (email === "") return false;

		return array.find(user => user.email.includes(email));
	};
	const addUserToDevelopers = user => {
		if (!checkIfEmailIsInArray(user.email, developers)) {
			setDevelopers(prev => [...prev, user]);
			setDeveloperEmail("");
		} else if (user.email === curUser.email) {
			setDeveloperEmail("");
			setError("You are already added");
		} else {
			setDeveloperEmail("");
			setError("Already added");
		}
	};
	return (
		<div className="timeline-tasks-add">
			<form className="form" onSubmit={submit}>
				<div className="form-item">
					<input
						type="text"
						name="title"
						required
						value={title}
						onChange={setItems}
					/>
					<label htmlFor="title">Title</label>
				</div>
				<div className="form-item ">
					<input
						type="text"
						name="description"
						required
						value={description}
						onChange={setItems}
					/>
					<label htmlFor="description">Description</label>
				</div>
				<div className="form-item-group">
					<div className="form-item-group-item">
						<label htmlFor="description">Priority</label>
						<select
							name="priority"
							value={priority}
							onChange={setItems}
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
					<div className="form-item-group-item">
						<label htmlFor="description">Status</label>
						<select
							name="status"
							value={status}
							onChange={setItems}
						>
							<option value="todo">To do</option>
							<option value="doing">Doing</option>
							<option value="completed">Completed</option>
						</select>
					</div>
				</div>

				<div className="form-item suggestion">
					<input
						type="text"
						name="developers"
						value={developerEmail}
						onChange={setItems}
					/>
					<label htmlFor="developers">Add Developers</label>
					<div className="suggestion-box">
						{checkIfEmailIsInArray(developerEmail, allUsers) &&
							currentProject.developers.map(user =>
								user.email.includes(developerEmail) ? (
									<p
										key={user.email}
										onClick={() =>
											addUserToDevelopers(user)
										}
									>
										{user.email}
									</p>
								) : null
							)}
					</div>
				</div>
				{error && <div className="form-error">{error}</div>}
				<div className="developer-tag">
					{developers.map(developer => (
						<p
							className="developer-tag-item"
							key={developer.email}
							onClick={() =>
								setDevelopers(prev =>
									prev.filter(
										dev => dev.email !== developer.email
									)
								)
							}
						>
							{developer.username}
						</p>
					))}
				</div>

				<div className="form-item">
					<input
						className="date"
						type="date"
						name="startDate"
						required
						value={startDate}
						onChange={setItems}
					/>
					<label htmlFor="startDate">Start Date</label>
				</div>
				<div className="form-item">
					<input
						className="date"
						type="date"
						name="endDate"
						required
						value={endDate}
						onChange={setItems}
					/>
					<label htmlFor="endDate">End Date</label>
				</div>

				<div className="form-button">
					<button type="submit">Add Task</button>
				</div>
			</form>
		</div>
	);
};

export default AddTask;

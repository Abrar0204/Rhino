import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/actions/projectsActions";

const AddProject = ({ id, closeModel, allUsers = [], user: curUser }) => {
	const [title, setTitle] = useState("");
	const [developers, setDevelopers] = useState([]);
	const [developerEmail, setDeveloperEmail] = useState("");
	const [error, setError] = useState("");
	const [allDevelopers, setAllDevelopers] = useState([]);
	const dispatch = useDispatch();

	const checkIfEmailIsInArray = (email, array) => {
		if (email === "") return false;

		return array.find(user => user.email.includes(email));
	};

	const setItems = e => {
		const { name, value } = e.target;
		switch (name) {
			case "title":
				return setTitle(value);
			case "developer":
				return setDeveloperEmail(value);
		}
	};
	const submit = e => {
		e.preventDefault();
		let newDevs = developers;
		newDevs.push(curUser);
		dispatch(addProject(title, newDevs));
		closeModel();
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
		<div className="projects-add">
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
				<div className="form-item suggestion">
					<input
						type="text"
						name="developer"
						value={developerEmail}
						onChange={setItems}
					/>
					<label htmlFor="title">Add Developers</label>
					<div className="suggestion-box">
						{checkIfEmailIsInArray(developerEmail, allUsers) &&
							allUsers.map(user =>
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
				<div className="form-button">
					<button type="submit">Create Project</button>
				</div>
			</form>
		</div>
	);
};

export default AddProject;

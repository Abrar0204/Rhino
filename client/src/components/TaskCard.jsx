import React from "react";
import UserAvatar from "./UserAvatar";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
const TaskCard = ({ task, currentDate }) => {
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

	const startOrEnd = () => {
		console.log(convertToDateString(currentDate.valueOf()));
		return task.endDate === convertToDateString(currentDate.valueOf())
			? "end"
			: "start";
	};
	return (
		<div
			key={task.title}
			className={`timeline-tasks-grid-item ${startOrEnd()}`}
		>
			<h1 className="title">{task.title}</h1>
			<p className="description">{task.description}</p>

			<div className="developers">
				{task.developers.map(developer => (
					<UserAvatar
						name={developer.username}
						key={developer.username + task.title}
					/>
				))}
			</div>
			<p className={`priority ${task.priority.toLowerCase()}`}>
				{task.priority}
			</p>

			{startOrEnd() === "start" ? (
				<div className="today start">
					<UilExclamationTriangle /> Starts Today
				</div>
			) : (
				<div className="today end">
					<UilExclamationTriangle /> Ends Today
				</div>
			)}
		</div>
	);
};

export default TaskCard;

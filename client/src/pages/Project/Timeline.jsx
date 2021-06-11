import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/actions/tasksAction";
import Loader from "../../components/Loader";
import TaskCard from "../../components/TaskCard";
import { UilPlus } from "@iconscout/react-unicons";
import { useHistory } from "react-router";
import AddTask from "../AddTask";
import { getAllProjects } from "../../redux/actions/projectsActions";
const Timeline = ({ match }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [modelOpen, setModelOpen] = useState(false);

	const { tasks, loading } = useSelector(state => state.tasks);
	const { user, allUser } = useSelector(state => state.auth);

	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(getAllProjects());
		dispatch(getTasks(match.params.id));
	}, [dispatch, match.params.id]);
	const convertToDateString = date => {
		const dateObj = new Date(parseInt(date));

		const dateString =
			addZeroInBegginning(dateObj.getDate()) +
			"/" +
			addZeroInBegginning(dateObj.getMonth() + 1) +
			"/" +
			dateObj.getFullYear().toString() +
			" ";

		return dateString.trim();
	};
	const addZeroInBegginning = (number = 0) => {
		if (number.toString().length === 1) {
			return "0" + number.toString();
		}
		return number.toString().trim();
	};
	const convertToTimeString = date => {
		const dateObj = new Date(parseInt(date));

		const time = formatAMPM(dateObj);

		return time.trim();
	};

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime =
			addZeroInBegginning(hours) +
			":" +
			addZeroInBegginning(minutes) +
			" " +
			ampm +
			" IST";
		return strTime.trim();
	}

	return (
		<div className="project">
			<Sidebar id={match.params.id} />

			<div className="project-screen">
				{loading ? (
					<Loader />
				) : (
					<div className="timeline">
						<div className="timeline-tasks">
							{modelOpen && (
								<div>
									<div
										className="overlay"
										onClick={() => setModelOpen(false)}
									></div>
									<AddTask
										user={user}
										allUsers={allUser}
										id={match.params.id}
										closeModel={() => setModelOpen(false)}
									/>
								</div>
							)}

							<div className="title">
								<h1>
									Tasks on{" "}
									{convertToDateString(currentDate.valueOf())}
								</h1>
								<UilPlus onClick={() => setModelOpen(true)} />
							</div>

							{tasks[
								convertToDateString(currentDate.valueOf())
							] ? (
								<div className="timeline-tasks-grid">
									{tasks[
										convertToDateString(
											currentDate.valueOf()
										)
									].tasks.map(task => (
										<TaskCard
											key={task._id}
											task={task}
											currentDate={currentDate}
										/>
									))}
								</div>
							) : (
								<div className="no-tasks">
									<h1>No Tasks scheduled on this date</h1>
								</div>
							)}
						</div>
						<div className="timeline-calendar">
							<Calendar
								value={currentDate}
								onChange={setCurrentDate}
							/>
						</div>
						<div className="timeline-ongoing"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Timeline;

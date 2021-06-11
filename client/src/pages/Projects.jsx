import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import { default as Logo } from "../assets/svgs/Logo-white.svg";
import { getAllProjects } from "../redux/actions/projectsActions";
import AddProject from "./AddProject";
import { UilPlus } from "@iconscout/react-unicons";
import {
	signOutAction,
	getUser,
	getAllUsers,
} from "../redux/actions/authActions";
const Projects = () => {
	const loggedIn = useSelector(state =>
		state.auth.accessToken ? true : false
	);
	const { loading, projects, error } = useSelector(state => state.projects);
	const { user, allUser } = useSelector(state => state.auth);

	const [modelOpen, setModelOpen] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!loggedIn) return history.push("/");
		dispatch(getUser());
		dispatch(getAllUsers());
		dispatch(getAllProjects());
	}, [loggedIn, dispatch, history]);

	const gotoProject = projectId => {
		history.push(`/projects/${projectId}/timeline`);
	};

	const signout = () => {
		dispatch(signOutAction());
		history.push(`/`);
	};

	return (
		<div className="projects">
			<div className="projects-header">
				<img src={Logo} alt="Logo-white" />
				<div className="signout" onClick={signout}>
					Sign Out
				</div>
			</div>
			{loading ? (
				<Loader color="light" />
			) : (
				<div className="projects-content">
					{modelOpen && (
						<div>
							<div
								className="overlay"
								onClick={() => setModelOpen(false)}
							></div>
							<AddProject
								allUsers={allUser.filter(
									userD => userD.email !== user.email
								)}
								user={user}
								id={user._id}
								closeModel={() => setModelOpen(false)}
							/>
						</div>
					)}
					<h1 className="projects-content-title">Your Projects</h1>
					<div className="projects-content-container">
						{projects.map(project => (
							<ProjectCard
								key={project._id}
								project={project}
								gotoProject={gotoProject}
							/>
						))}
						<div
							className="project-card add"
							onClick={() => setModelOpen(true)}
						>
							<UilPlus />
							<h1>Add Project</h1>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Projects;

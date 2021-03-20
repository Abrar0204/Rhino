import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import { default as Logo } from "../assets/svgs/Logo-white.svg";
import { getAllProjects } from "../redux/actions/projectsActions";

const Projects = () => {
	const loggedIn = useSelector(state =>
		state.auth.accessToken ? true : false
	);
	const { loading, projects, error } = useSelector(state => state.projects);
	const user = useSelector(state => state.auth.user);
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!loggedIn) return history.push("/");

		dispatch(getAllProjects());
	}, [loggedIn, dispatch, history]);

	const gotoProject = projectId => {
		history.push(`/projects/${projectId}/timeline`);
	};

	return (
		<div className="projects">
			<div className="projects-header">
				<img src={Logo} alt="Logo-white" />
			</div>
			{loading ? (
				<Loader color="light" />
			) : (
				<div className="projects-content">
					<h1 className="projects-content-title">Your Projects</h1>
					<div className="projects-content-container">
						{projects.map(project => (
							<ProjectCard
								key={project._id}
								project={project}
								gotoProject={gotoProject}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Projects;

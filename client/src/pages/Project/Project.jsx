import React from "react";
import Sidebar from "../../components/Sidebar";

const Project = ({ match }) => {
	return (
		<div className="project">
			<Sidebar />
			<div className="project-screen"></div>
		</div>
	);
};

export default Project;

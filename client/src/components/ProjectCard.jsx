import React from "react";
import UserAvatar from "./UserAvatar";
const ProjectCard = ({ project, gotoProject }) => {
	const { name: title, developers, _id: id } = project;

	return (
		<div className="project-card" onClick={() => gotoProject(id)}>
			<h1 className="title">{title}</h1>

			<div className="project-card-avatar-container">
				{developers.map(developer => (
					<UserAvatar
						name={developer.username}
						key={developer.username}
					/>
				))}
			</div>
		</div>
	);
};

export default ProjectCard;

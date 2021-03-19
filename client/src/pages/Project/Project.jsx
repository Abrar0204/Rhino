import React from "react";

const Project = ({ match }) => {
	return <div>Project {match.params.id}</div>;
};

export default Project;

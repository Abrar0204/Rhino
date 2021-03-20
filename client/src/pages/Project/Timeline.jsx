import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
const Timeline = ({ match }) => {
	return (
		<div className="project">
			<Sidebar id={match.params.id} />
			<div className="project-screen">
				<div>Timeline</div>
			</div>
		</div>
	);
};

export default Timeline;

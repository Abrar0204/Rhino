import React from "react";

const Loader = ({ color }) => {
	return (
		<div className="loader">
			<div className={`bouncer ${color}`}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { default as logo } from "../assets/svgs/Logo-white.svg";
import { Link } from "react-router-dom";
import { UilSchedule, UilFavorite, UilImages } from "@iconscout/react-unicons";
const Sidebar = ({ id }) => {
	const history = useHistory();
	const [selected, setSelected] = useState("");
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes("timeline"))
			return setSelected("timeline");
		if (location.pathname.includes("bookmarks"))
			return setSelected("bookmarks");
		setSelected("assets");
	}, [location.pathname, setSelected]);
	return (
		<nav className="sidebar">
			<div
				className="sidebar-logo"
				onClick={() => history.push("/projects")}
			>
				<img src={logo} alt="Logo" />
				<h1>Rhino</h1>
			</div>
			<div className="sidebar-list">
				<Link
					to={`/projects/${id}/timeline`}
					className={`sidebar-list-item ${
						selected === "timeline" && "selected"
					}`}
				>
					<UilSchedule />
					<h1>Timeline</h1>
				</Link>
				<Link
					to={`/projects/${id}/bookmarks`}
					className={`sidebar-list-item ${
						selected === "bookmarks" && "selected"
					}`}
				>
					<UilFavorite />
					<h1>Bookmarks</h1>
				</Link>
				<Link
					to={`/projects/${id}/assets`}
					className={`sidebar-list-item ${
						selected === "assets" && "selected"
					}`}
				>
					<UilImages />
					<h1>Assets</h1>
				</Link>
			</div>
		</nav>
	);
};

export default Sidebar;

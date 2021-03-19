import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { default as logo } from "../assets/svgs/Logo.svg";
import { signOutAction } from "../redux/actions/authActions";
import UserAvatar from "./UserAvatar";
const Navbar = () => {
	const { user, loading, accessToken } = useSelector(state => state.auth);
	const [selected, setSelected] = useState("home");
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		const locationPath = location.pathname.slice(1);
		setSelected(locationPath ? locationPath : "home");
	}, [location]);
	const signout = () => {
		dispatch(signOutAction());
	};
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src={logo} />
			</div>
			<div className="navbar-list">
				<Link
					to="/"
					className={`navbar-list-item ${
						selected === "home" && "selected"
					}`}
				>
					Home
				</Link>
				<Link
					to="/projects"
					className={`navbar-list-item ${
						selected === "projects" && "selected"
					}`}
				>
					Projects
				</Link>
			</div>
			<div className="navbar-profile">
				{!loading &&
					(user.username ? (
						<UserAvatar name={user.username} onClick={signout} />
					) : (
						<div
							className="sign-out"
							onClick={() => history.push("/signin")}
						>
							Sign In
						</div>
					))}
			</div>
		</nav>
	);
};

export default Navbar;

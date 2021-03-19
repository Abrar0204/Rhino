import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { default as logo } from "../assets/svgs/Logo.svg";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
const SignIn = () => {
	const [selected, setSelected] = useState("signin");
	const user = useSelector(state => state.auth.user);
	const history = useHistory();
	useEffect(() => {
		if (user.username) history.push("/projects");
	}, [user, history]);

	return (
		<div className="signin">
			<div className="signin-header">
				<div className="logo">
					<img src={logo} alt="rhino-logo" />
				</div>
				<div className="title">
					<h1>Welcome To Rhino </h1>
				</div>
			</div>

			<div className="signin-form-container">
				<div className="tabs">
					<div
						className={`tabs-item ${
							selected === "signin" && "selected"
						}`}
						onClick={() => setSelected("signin")}
					>
						Sign In
					</div>
					<div
						className={`tabs-item ${
							selected === "signup" && "selected"
						}`}
						onClick={() => setSelected("signup")}
					>
						Sign Up
					</div>
				</div>
				{selected === "signin" ? <SigninForm /> : <SignupForm />}
			</div>
		</div>
	);
};

export default SignIn;

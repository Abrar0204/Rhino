import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginAction } from "../redux/actions/authActions";

const SigninForm = () => {
	const [email, setEmail] = useState("rhino@gmail.com");
	const [password, setPassword] = useState("Rhino");
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();
	const setItems = e => {
		const { name, value } = e.target;
		switch (name) {
			case "email":
				return setEmail(value);
			case "password":
				return setPassword(value);
			default:
				break;
		}
	};

	function validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	const signin = e => {
		e.preventDefault();
		if (!validateEmail(email)) {
			return setError("Enter a valid email");
		}
		setError("");
		dispatch(loginAction(email, password, history));
	};

	return (
		<form className="sigin-form form" onSubmit={signin}>
			<div className="form-item">
				<input
					type="text"
					name="email"
					required
					value={email}
					onChange={setItems}
				/>
				<label htmlFor="email">Email</label>
			</div>
			<div className="form-item">
				<input
					type="password"
					name="password"
					required
					value={password}
					onChange={setItems}
				/>
				<label htmlFor="password">Password</label>
			</div>
			{error ? <p className="form-error">{error}</p> : null}
			<div className="form-button">
				<button type="submit">Sign In</button>
			</div>
		</form>
	);
};

export default SigninForm;

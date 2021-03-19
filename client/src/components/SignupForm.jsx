import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/actions/authActions";

const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const setItems = e => {
		const { name, value } = e.target;
		switch (name) {
			case "email":
				return setEmail(value);
			case "password":
				return setPassword(value);
			case "username":
				return setUsername(value);
			default:
				break;
		}
	};

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	const signup = e => {
		e.preventDefault();
		if (!validateEmail(email)) {
			return setError("Enter a valid email");
		}
		setError("");
		dispatch(registerAction(username, email, password));
	};

	return (
		<form className="sigup-form form" onSubmit={signup}>
			<div className="form-item">
				<input
					type="text"
					name="username"
					required
					value={username}
					onChange={setItems}
				/>
				<label htmlFor="username">Username</label>
			</div>
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
			{error && <p className="form-error">{error}</p>}
			<div className="form-button">
				<button type="submit">Sign Up</button>
			</div>
		</form>
	);
};

export default SignupForm;

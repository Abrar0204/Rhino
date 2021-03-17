import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
const App = () => {
	const testApi = async () => {
		try {
			const { data } = await axios.post("/api/auth/login", {
				email: "abrar@gmail.com",
				password: "admin",
			});

			console.log(data);
		} catch (err) {
			console.log(err.message);
		}
	};
	useEffect(() => {
		testApi();
	}, []);

	return (
		<Router>
			<Switch>
				<Route component={Home} path="/" exact />
			</Switch>
		</Router>
	);
};

export default App;

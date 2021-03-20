import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Projects from "./pages/Projects";
import Timeline from "./pages/Project/Timeline";
import Bookmarks from "./pages/Project/Bookmarks";
import Assets from "./pages/Project/Assets";
import SignIn from "./pages/SignIn";
import { getUser } from "./redux/actions/authActions";
import "./scss/main.min.css";

import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);
	return (
		<Router>
			<Switch>
				<Route component={SignIn} path="/" exact />
				{/* <Route component={SignIn} path="/signin" exact /> */}

				<Route component={Projects} path="/projects" exact />
				<Route component={Timeline} path="/projects/:id/timeline" />
				<Route component={Bookmarks} path="/projects/:id/bookmarks" />
				<Route component={Assets} path="/projects/:id/assets" />
			</Switch>
		</Router>
	);
};

export default App;

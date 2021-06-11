import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./reducers/authReducer";
import projectsReducer from "./reducers/projectReducers";
import bookmarkReducer from "./reducers/bookmarkReducer";
import assetsReducer from "./reducers/assetsReducer";
import tasksReducer from "./reducers/tasksReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducers = combineReducers({
	auth: authReducer,
	projects: projectsReducer,
	bookmarks: bookmarkReducer,
	assets: assetsReducer,
	tasks: tasksReducer,
});
const middleware = [thunk];

export default createStore(
	reducers,
	composeWithDevTools(applyMiddleware(...middleware))
);

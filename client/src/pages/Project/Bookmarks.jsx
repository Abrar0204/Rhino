import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkContainer from "../../components/BookmarkContainer";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { getBookmarks } from "../../redux/actions/bookmarkAction";
import { default as NotFound } from "../../assets/svgs/Not-found.svg";
import { getAllProjects } from "../../redux/actions/projectsActions";
const Bookmarks = ({ match }) => {
	const dispatch = useDispatch();
	const { bookmarks, loading } = useSelector(state => state.bookmarks);
	const [searchString, setSearchString] = useState("");
	useEffect(() => {
		dispatch(getAllProjects());
		dispatch(getBookmarks(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<div className="project">
			<Sidebar id={match.params.id} />
			<div className="project-screen">
				<div>
					{loading ? (
						<Loader color="primary" />
					) : bookmarks ? (
						<div>
							<BookmarkContainer bookmarkNode={bookmarks} />
						</div>
					) : (
						<div className="bookmark-not-found ">
							<img
								src={NotFound}
								className="icon"
								alt="Not Found"
								onError={e => (e.target.src = NotFound)}
							/>
							Install our chrome extesnion to make use of this
							feature
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Bookmarks;

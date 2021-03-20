import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkContainer from "../../components/BookmarkContainer";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { getBookmarks } from "../../redux/actions/bookmarkAction";

const Bookmarks = ({ match }) => {
	const dispatch = useDispatch();
	const { bookmarks, loading } = useSelector(state => state.bookmarks);

	useEffect(() => {
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
						<div>You havent added any bookmarks yet</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Bookmarks;

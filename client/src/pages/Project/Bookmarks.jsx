import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkContainer from "../../components/BookmarkContainer";
import Loader from "../../components/Loader";
import { getBookmarks } from "../../redux/actions/bookmarkAction";

const Bookmarks = ({ match }) => {
	const dispatch = useDispatch();
	const { bookmarks, loading } = useSelector(state => state.bookmarks);

	useEffect(() => {
		dispatch(getBookmarks(match.params.id));
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : bookmarks ? (
				<div>
					<BookmarkContainer bookmarkNode={bookmarks} />
				</div>
			) : (
				<div>You havent added any bookmarks yet</div>
			)}
		</div>
	);
};

export default Bookmarks;

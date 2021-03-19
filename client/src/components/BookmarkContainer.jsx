import React, { useState } from "react";
import { UilFolder } from "@iconscout/react-unicons";
import { default as Bookmark } from "../assets/svgs/Vector.svg";
const BookmarkContainer = ({ bookmarkNode = {} }) => {
	const [prev, setPrev] = useState({});
	const [root, setRoot] = useState(bookmarkNode);

	const goBack = () => {
		setRoot(prev);
	};

	return (
		<div>
			<h1 onClick={goBack}>Back</h1>
			<div className="bookmarks-grid">
				{root?.children &&
					root.children.map(child => {
						if (child.type === "folder")
							return (
								<div
									className="bookmarks-grid-item"
									onClick={() => {
										setRoot(child);
										setPrev(bookmarkNode);
									}}
								>
									<UilFolder />
									{child.title}
								</div>
							);
						return (
							<div className="bookmarks-grid-item">
								<img
									src={
										child.icon !== ""
											? child.icon
											: Bookmark
									}
									height="30"
									width="30"
									alt={child.title}
									onError={e => (e.target.src = Bookmark)}
								></img>
								{child.title}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default BookmarkContainer;

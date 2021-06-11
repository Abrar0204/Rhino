import React, { useState } from "react";
import { UilFolder, UilAngleLeftB } from "@iconscout/react-unicons";
import { default as Bookmark } from "../assets/svgs/Vector.svg";
const BookmarkContainer = ({ bookmarkNode = {} }) => {
	const [prev, setPrev] = useState({});
	const [root, setRoot] = useState(bookmarkNode);

	const goBack = () => {
		setRoot(prev);
	};

	const getDomainName = (url = "") => {
		const domain = new URL(url);
		let domainName = domain.hostname.replace("www", "");
		domainName = domainName[0].toUpperCase() + domainName.slice(1);
		return domainName;
	};

	return (
		<div className="bookmarks">
			{root.title !== "root" && (
				<h1 onClick={goBack} className="back-button-container">
					<UilAngleLeftB className="back-button" />
				</h1>
			)}

			<div className="bookmarks-grid">
				{root?.children &&
					root.children.map(child => {
						if (child.type === "folder")
							return (
								<div
									key={child.title}
									className="bookmarks-grid-item"
									onClick={() => {
										setRoot(child);
										setPrev(bookmarkNode);
									}}
								>
									<UilFolder className="icon" />
									{child.title}
								</div>
							);
						return (
							<div
								key={child.title}
								className="bookmarks-grid-item"
								onClick={() => {
									window.open(child.url);
								}}
							>
								<img
									src={
										child.icon !== ""
											? child.icon
											: Bookmark
									}
									className="icon"
									alt={child.title}
									onError={e => (e.target.src = Bookmark)}
								></img>
								{getDomainName(child.url)}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default BookmarkContainer;

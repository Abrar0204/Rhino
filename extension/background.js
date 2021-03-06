class Bookmark {
	type = "";
	id = "";
	title = "";
	children = [];
	url = "";

	constructor({ type, id, title, url }) {
		this.type = type;
		this.id = id;
		this.title = title;
		this.url = url;
	}

	addChild(child) {
		if (this.type === "folder") this.children.push(child);
	}
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(
		sender.tab
			? "from a content script:" + sender.tab.url
			: "from the extension"
	);
	if (request.reqType == "assets") {
		console.log("assets");
		chrome.storage.local.get(
			["accessToken", "selectedProject"],
			async token => {
				if (token.accessToken) {
					let { data, type } = request;
					console.log(token);
					try {
						let res = await fetch(
							`https://rhino-project-manager.herokuapp.com/api/projects/assets/${token.selectedProject}`,
							{
								method: "PUT",
								body: JSON.stringify({
									data,
									type,
								}),
								headers: {
									"Content-type":
										"application/json; charset=UTF-8",
									Authorization: `Bearer ${token.accessToken} `,
								},
							}
						);
						sendResponse(true);
					} catch (err) {
						console.log(err);
						sendResponse(false);
					}
				}
			}
		);
	}
});

chrome.bookmarks.onCreated.addListener((id, bookmarkTree) => {
	const isFolder =
		bookmarkTree.url === null || bookmarkTree.url === undefined;

	const bookmark = new Bookmark({
		title: bookmarkTree.title,
		id: bookmarkTree.id,
		type: isFolder ? "folder" : "bookmark",
		url: isFolder ? "" : bookmarkTree.url,
	});

	chrome.storage.local.get(["accessToken"], token => {
		sendBookmarkToSever(bookmark, token);
	});
});

const sendBookmarkToSever = async (bookmark, token) => {
	console.log(bookmark, token);
	const res = await fetch(
		"https://rhino-project-manager.herokuapp.com/api/bookmarks/new",
		{
			method: "POST",
			body: JSON.stringify(bookmark),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token.accessToken} `,
			},
		}
	);
};

// chrome.runtime.onInstalled.addListener(() => {
// 	let rootNode;
// 	chrome.bookmarks.getTree((res) => {
// 		const element = res[0];

// 		rootNode = new Bookmark({
// 			title: "root",
// 			id: element.id,
// 			type: "folder",
// 			url: "",
// 		});

// 		addChildren(element.children, rootNode);

// 		sendDataToServer(rootNode);
// 	});
// });

// const sendDataToServer = async (bookmarks) => {
// 	try {
// 		const res = await fetch("https://rhino-project-manager.herokuapp.com/api/bookmarks", {
// 			method: "POST",
// 			body: JSON.stringify(bookmarks),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const addChildren = (childrens = [], currentNode) => {
// 	childrens.forEach((child) => {
// 		const isBookmark =
// 			child.children === null || child.children === undefined;

// 		const newChildNode = new Bookmark({
// 			title: child.title,
// 			id: child.id,
// 			type: !isBookmark ? "folder" : "bookmark",
// 			url: isBookmark ? child.url : "",
// 		});

// 		currentNode.addChild(newChildNode);
// 		if (!isBookmark) {
// 			addChildren(child.children, newChildNode);
// 		}
// 	});
// };

// const addToNode = (parentIndex, children) => {
// 	children.forEach((element) => {
// 		const type = element.children ? "folder" : "bookmark";
// 		const newNode = new Bookmark({
// 			title: element.title,
// 			id: element.id,
// 			type: type,
// 			url: type === "bookmark" ? element.url : null,
// 			children: type === "folder" ? element.children : null,
// 		});
//         if (newNode.children) {
// 			newNode.children.forEach((child) => {
// 				addToNode(child);
// 			});
// 		}
// 	});

// };

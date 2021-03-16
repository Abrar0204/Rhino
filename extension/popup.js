document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("form");

	class Bookmark {
		type = "";
		id = "";
		title = "";
		children = [];
		url = "";
		icon = "";

		constructor({ type, id, title, url, icon }) {
			this.type = type;
			this.id = id;
			this.title = title;
			this.url = url;
			this.icon = icon;
		}

		addChild(child) {
			if (this.type === "folder") this.children.push(child);
		}
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		getBookmarksTreeAndLogin();
	});

	const getBookmarksTreeAndLogin = () => {
		let rootNode;
		let username = document.querySelector(".username").value;
		let password = document.querySelector(".password").value;

		chrome.bookmarks.getTree((res) => {
			const element = res[0];

			rootNode = new Bookmark({
				title: "root",
				id: element.id,
				type: "folder",
				url: "",
				icon: "",
			});

			addChildren(element.children, rootNode);

			login(username, password, rootNode);
		});
	};

	const login = async (username, password, bookmarkTree) => {
		// try {
		// 	const res = await fetch("http://localhost:5000/api/bookmarks", {
		// 		method: "POST",
		// 		body: JSON.stringify(bookmarks),
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// } catch (err) {
		// 	console.log(err);
		// }
		const res = await fetch(
			"http://localhost:5000/api/auth/login/extension",
			{
				method: "POST",
				body: JSON.stringify({
					username,
					password,
					bookmarkTree,
				}),
				headers: {
					"Content-type": "application/json",
				},
			}
		);
		const data = await res.json();
		if (data.accessToken) {
			console.log(data.accessToken);
			chrome.storage.local.set({ accessToken: data.accessToken });
		} else {
			console.log(data);
			console.log("Error");
		}
	};

	const addChildren = async (childrens = [], currentNode) => {
		childrens.forEach(async (child) => {
			const isBookmark =
				child.children === null || child.children === undefined;

			const newChildNode = new Bookmark({
				title: child.title,
				id: child.id,
				type: !isBookmark ? "folder" : "bookmark",
				url: isBookmark ? child.url : "",
				icon: "",
			});

			currentNode.addChild(newChildNode);
			if (!isBookmark) {
				addChildren(child.children, newChildNode);
			}
		});
	};
});

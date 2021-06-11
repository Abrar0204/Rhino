document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("form");
	const greetingTag = document.getElementById("greeting");
	const projectSelector = document.getElementById("project-selector");
	const selectElement = document.getElementById("select-element");
	const signOut = document.getElementById("signout");
	const loader = document.getElementById("loader");
	const bookmarkSync = document.getElementById("bookmarks-sync");

	bookmarkSync.addEventListener("click", e => {
		e.preventDefault();
		getBookmarksTreeAndSyncToProject();
	});

	chrome.storage.local.get(["accessToken", "username"], async data => {
		if (data.accessToken && data.username) {
			showForm(false);
			showLoader(true);
			await getProjects(data.accessToken, data.username);
			showLoader(false);
			showHome(true);
		}
	});

	const showHome = show => {
		if (show) {
			projectSelector.classList.remove("hidden");
			return;
		}
		projectSelector.classList.add("hidden");
	};
	const showForm = show => {
		if (show) {
			form.classList.remove("hidden");
			return;
		}
		form.classList.add("hidden");
	};
	const showLoader = show => {
		if (show) {
			loader.classList.remove("hidden");
			return;
		}
		loader.classList.add("hidden");
	};

	const getProjects = async (accessToken, username) => {
		try {
			const res = await fetch(
				"https://rhino-project-manager.herokuapp.com/api/projects",
				{
					method: "GET",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${accessToken} `,
					},
				}
			);
			removeChildrenOfElement(selectElement);
			greetingTag.textContent = `Hello, ${username}`;
			const data = await res.json();

			data.projects.forEach(project => {
				let option = document.createElement("option");
				option.value = project._id;
				option.innerText = project.name;

				selectElement.appendChild(option);
			});
			chrome.storage.local.set({
				selectedProject: data.projects[0]._id,
			});
			selectElement.addEventListener("click", e => {
				chrome.storage.local.set({
					selectedProject: e.target.value,
				});
			});
		} catch (err) {
			console.log(err);
		}
	};

	signOut.addEventListener("click", () => {
		chrome.storage.local.remove([
			"accessToken",
			"selectedProject",
			"username",
		]);
		form.classList.remove("hidden");
		projectSelector.classList.add("hidden");
	});
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

	form.addEventListener("submit", e => {
		e.preventDefault();

		getBookmarksTreeAndLogin();
	});

	const getBookmarksTreeAndSyncToProject = () => {
		let rootNode;

		chrome.bookmarks.getTree(res => {
			const element = res[0];

			rootNode = new Bookmark({
				title: "root",
				id: element.id,
				type: "folder",
				url: "",
				icon: "",
			});

			addChildren(element.children, rootNode);
			chrome.storage.local.get(
				["accessToken", "selectedProject"],
				async data => {
					if (data.selectedProject && data.accessToken) {
						try {
							const res = await fetch(
								`https://rhino-project-manager.herokuapp.com/api/bookmarks/${data.selectedProject}`,
								{
									method: "POST",
									headers: {
										"Content-type":
											"application/json; charset=UTF-8",
										Authorization: `Bearer ${data.accessToken} `,
									},
									body: JSON.stringify({
										bookmarkTree: rootNode,
									}),
								}
							);
						} catch (err) {
							console.log(err);
						}
					}
				}
			);
		});
	};

	const getBookmarksTreeAndLogin = () => {
		let rootNode;
		let email = document.getElementsByClassName("email")[0];
		let password = document.getElementsByClassName("password")[0];

		chrome.bookmarks.getTree(res => {
			const element = res[0];

			rootNode = new Bookmark({
				title: "root",
				id: element.id,
				type: "folder",
				url: "",
				icon: "",
			});

			addChildren(element.children, rootNode);

			login(email.value, password.value, rootNode);
			email.value = "";
			password.value = "";
		});
	};

	const removeChildrenOfElement = parent => {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	};

	const login = async (email, password, bookmarkTree) => {
		showForm(false);
		showLoader(true);
		const res = await fetch(
			"https://rhino-project-manager.herokuapp.com/api/auth/login/extension",
			{
				method: "POST",
				body: JSON.stringify({
					email,
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
			chrome.storage.local.set({
				accessToken: data.accessToken,
				username: data.user.username,
			});
			showForm(false);
			showLoader(true);

			await getProjects(data.accessToken, data.user.username);
			showLoader(false);
			showHome(true);
		} else {
			console.log(data);
			console.log("Error");
		}
	};

	const addChildren = async (childrens = [], currentNode) => {
		childrens.forEach(async child => {
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

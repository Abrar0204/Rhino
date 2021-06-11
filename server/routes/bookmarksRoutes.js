const authenticateToken = require("../middleware/authenticateToken");
const { Bookmark } = require("../models/Bookmark");
const { Project } = require("../models/Project");
const { User } = require("../models/User");
const axios = require("axios");
const router = require("express").Router();

router.get("/:id", authenticateToken, async (req, res) => {
	try {
		const projectId = req.params.id;
		const project = await Project.findById(projectId);

		const bookmarks = await Bookmark.findById(project.bookmarks);
		console.log(project);
		res.json({ bookmarks });
	} catch (err) {
		return res.status(401).json({ error: "Error" });
	}
});

router.post("/:id", authenticateToken, async (req, res) => {
	try {
		console.log("dsas");
		const { bookmarkTree } = req.body;
		const projectId = req.params.id;
		const project = await Project.findById(projectId);
		// console.log(project);
		// const bookmarks = await Bookmark.findById(project.bookmarks);
		await getBookmarkIcons(bookmarkTree);

		const bookmark = new Bookmark({
			title: "root",
			type: "folder",
			children: bookmarkTree.children,
			url: "",
			project: project._id,
		});

		if (project.bookmarks) {
			const projBookmark = await Bookmark.findById(project.bookmarks);
			let newBook = projBookmark.children;
			bookmarkTree.children.forEach(book => newBook.push(book));
			// console.log(newBook);
			projBookmark.children = newBook;

			await projBookmark.save();
		} else {
			project.bookmarks = bookmark._id;
			await bookmark.save();
			await project.save();
		}

		res.json({ bookmarks });
	} catch (err) {
		return res.status(401).json({ error: "Error" });
	}
});

const getBookmarkIcons = async node => {
	if (node.type === "bookmark") {
		let icon = "";
		try {
			const res = await axios.get(
				`https://besticon-demo.herokuapp.com/allicons.json?url=${node.url}`
			);

			const data = res?.data;
			icon = data?.icons[0]?.url || "";
		} catch (err) {}

		node.icon = icon;
	}

	return Promise.all(
		node.children.map(async child => await getBookmarkIcons(child))
	);
};

module.exports = router;

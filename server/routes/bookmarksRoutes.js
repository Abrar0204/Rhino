const authenticateToken = require("../middleware/authenticateToken");
const { Bookmark } = require("../models/Bookmark");
const { Project } = require("../models/Project");
const { User } = require("../models/User");

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

module.exports = router;

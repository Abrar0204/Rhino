const authenticateToken = require("../middleware/authenticateToken");
const { Project } = require("../models/Project");
const { User } = require("../models/User");
const { Assets } = require("../models/Assets");
const router = require("express").Router();

router.get("/", authenticateToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.user.username });
		let projectsDocs = await Project.find({ owner: user._id });
		let projects = [];
		await Promise.all(
			projectsDocs.map(async projectDoc => {
				let developerDocs = await User.find({
					projects: projectDoc._id,
				});
				let developers = developerDocs.map(doc => doc.username);
				projects.push({ ...projectDoc._doc, developers, owner: user });
			})
		);
		// console.log(projects[0]);
		return res.json({ projects });
	} catch (err) {
		res.status(404).json({ error: "No Projects found" });
	}
});

router.post("/", authenticateToken, async (req, res) => {
	try {
		const { name, developers } = req.body;
		const user = await User.findOne({ username: req.user.username });
		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}

		let developersIds = await Promise.all(
			developers.map(async developer => {
				let developerDoc = await User.findOne({
					email: developer,
				});
				if (developerDoc) {
					console.log(developerDoc);
					return developerDoc._id;
				}
			})
		);

		developersIds = developersIds.filter(elem => elem);

		let project = await Project.findOne({ name });

		if (project) {
			return res.json({ error: "Project already exists" });
		}
		project = new Project({
			name,
			developers: developersIds,
			bookmarks: user.bookmarks,
		});

		user.projects.push(project._id);
		await project.save();

		await user.save();

		return res.json(project);
	} catch (err) {
		console.log(err.message);
		res.status(404).json({ error: "Something went wrong" });
	}
});

router.put("/assets/:projectId", authenticateToken, async (req, res) => {
	try {
		let { data, type } = req.body;

		const project = await Project.findById(req.params.projectId);
		console.log(project);
		if (!project) {
			return res.status(404).json({ error: "Project Not Found" });
		}

		if (project.assets) {
			try {
				let assets = await Assets.findById(project.assets);
				assets.assets.push({ data, type });
				await assets.save();
				console.log(assets);
				return res.status(404).json({ assets });
			} catch (err) {
				return res.status(404).json({ error: "assets" });
			}
		} else {
			let assets = new Assets({
				project: project._id,
				assets: [
					{
						data,
						type,
					},
				],
			});

			await assets.save();

			project.assets = assets._id;

			await project.save();
		}
		res.json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "asset post" });
	}
});

router.get("/assets/:id", authenticateToken, async (req, res) => {
	try {
		const projectId = req.params.id;
		const project = await Project.findById(projectId);
		const assets = await Assets.findById(project.assets);
		res.json(assets.assets);
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "asset post" });
	}
});

module.exports = router;

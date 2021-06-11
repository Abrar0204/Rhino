const authenticateToken = require("../middleware/authenticateToken");
const { Project } = require("../models/Project");
const { User } = require("../models/User");
const { Assets } = require("../models/Assets");
const { Task } = require("../models/Task");
const router = require("express").Router();

router.get("/", authenticateToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.user.username });
		let projectsDocs = await Project.find({ developers: user._id });
		let projects = [];
		await Promise.all(
			projectsDocs.map(async projectDoc => {
				let developerDocs = await User.find({
					projects: projectDoc._id,
				});
				let developers = developerDocs.map(doc => ({
					username: doc.username,
					email: doc.email,
					id: doc._id,
				}));
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

		let developersIds = developers.map(developer => developer._id);

		let project = new Project({
			name,
			developers: developersIds,
			owner: user._id,
		});

		await project.save();

		await Promise.all(
			developersIds.map(async id => {
				let developer = await User.findById(id);
				developer.projects.push(project._id);
				await developer.save();
			})
		);

		let developerDocs = await User.find({
			projects: project._id,
		});
		let developersObj = developerDocs.map(doc => ({
			username: doc.username,
			email: doc.email,
			id: doc._id,
		}));
		let newProject = {
			...project._doc,
			developers: developersObj,
			owner: user,
		};

		console.log(developersObj);
		console.log(newProject);
		res.json({ project: newProject });
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

		res.json(assets);
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "asset post" });
	}
});

const convertToDateString = date => {
	const dateObj = new Date(parseInt(date));

	const dateString =
		addZeroInBegginning(dateObj.getDate()) +
		"/" +
		addZeroInBegginning(dateObj.getMonth() + 1) +
		"/" +
		dateObj.getFullYear().toString() +
		" ";

	return dateString.trim();
};
const addZeroInBegginning = (number = 0) => {
	if (number.toString().length === 1) {
		return "0" + number.toString();
	}
	return number.toString().trim();
};
router.post("/timeline/:id", authenticateToken, async (req, res) => {
	try {
		const projectId = req.params.id;
		let project = await Project.findById(projectId);

		const user = await User.findOne({ username: req.user.username });

		const { task } = req.body;

		let taskDoc = new Task({
			...task,
			project: projectId,
			startDate: convertToDateString(task.startDate),
			endDate: convertToDateString(task.endDate),
		});
		await taskDoc.save();

		if (project.tasks) {
			project.tasks.push(taskDoc._id);
		} else {
			project.tasks = [taskDoc._id];
		}

		await project.save();

		//Getting user data and pushing it to project.developers
		let developerDocs = await User.find({
			projects: projectId,
		});
		let developers = developerDocs.map(doc => ({
			username: doc.username,
			email: doc.email,
			id: doc._id,
		}));
		project = { ...project._doc, developers, owner: user };

		let developersForTasks = await Promise.all(
			task.developers.map(async developer => {
				let developerDoc = await User.findById(developer);
				return {
					username: developerDoc.username,
					email: developerDoc.email,
					id: developerDoc._id,
				};
			})
		);

		taskDoc = { ...taskDoc._doc, developers: developersForTasks };

		console.log(project, taskDoc);

		res.json({ project, task: taskDoc });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "Task Post error" });
	}
});

router.get("/timeline/:id", async (req, res) => {
	try {
		const projectId = req.params.id;
		const tasks = await Task.find({
			project: projectId,
		});

		let newTasks = await Promise.all(
			tasks.map(async task => {
				let developers = await Promise.all(
					task.developers.map(async developer => {
						let developerDoc = await User.findById(developer);
						return {
							username: developerDoc.username,
							email: developerDoc.email,
							id: developerDoc._id,
						};
					})
				);

				return { ...task._doc, developers };
			})
		);

		let objTasks = {};

		newTasks.forEach(task => {
			if (!objTasks[task.startDate]) {
				return (objTasks[task.startDate] = {
					date: task.startDate,
					tasks: [task],
				});
			}
			objTasks[task.startDate].tasks.push(task);
		});
		newTasks.forEach(task => {
			if (!objTasks[task.endDate]) {
				return (objTasks[task.endDate] = {
					date: task.endDate,
					tasks: [task],
				});
			}
			objTasks[task.endDate].tasks.push(task);
		});

		res.json({ tasks: objTasks });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "Task get error" });
	}
});

module.exports = router;

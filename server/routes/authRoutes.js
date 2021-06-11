const router = require("express").Router();

const { Bookmark } = require("../models/Bookmark");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
const authenticateToken = require("../middleware/authenticateToken");

const generateAccessToken = username =>
	jwt.sign({ username }, process.env.ACCESS_TOKEN_KEY);
const getBookmarkIcons = async node => {
	if (node.type === "bookmark") {
		let icon = "";
		try {
			const res = await axios.get(
				`https://besticon-demo.herokuapp.com/allicons.json?url=${node.url}`
			);

			const data = res.data;
			icon = data.icons[0].url || "";
		} catch (err) {}

		node.icon = icon;
		// console.log(node);
	}

	return Promise.all(
		node.children.map(async child => await getBookmarkIcons(child))
	);
};

router.post("/register", async (req, res) => {
	try {
		let { email, username, password } = req.body;

		let user = await User.findOne({ email });
		if (user) {
			return res.status(404).json({ error: "User Already Exists" });
		}
		user = new User({
			email,
			username,
			password: await bcrypt.hash(password, 10),
		});

		await user.save();

		const accessToken = generateAccessToken(user.username);

		res.json({
			accessToken,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "user" });
	}
});

router.post("/login", async (req, res) => {
	try {
		let { email, password } = req.body;

		let user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Wrong Password" });
		}

		const accessToken = generateAccessToken(user.username);
		res.json({
			accessToken,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "Something went wrong" });
	}
});

router.post("/login/extension", async (req, res) => {
	try {
		let { email, password, bookmarkTree } = req.body;

		let user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Wrong Password" });
		}

		const accessToken = generateAccessToken(user.username);

		await getBookmarkIcons(bookmarkTree);
		const bookmark = new Bookmark({
			title: "root",
			type: "folder",
			children: bookmarkTree.children,
			url: "",
			user: user._id,
		});

		await bookmark.save();

		user.bookmarks = bookmark._id;

		await user.save();

		res.json({
			accessToken,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "user" });
	}
});

router.get("/user", authenticateToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.user.username });
		res.json(user);
	} catch (err) {
		res.status(401).json({ error: "user not found" });
	}
});

router.get("/users", authenticateToken, async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (err) {
		res.status(401).json({ error: "user not found" });
	}
});
module.exports = router;

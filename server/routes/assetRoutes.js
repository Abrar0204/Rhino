const authenticateToken = require("../middleware/authenticateToken");
const { Assets } = require("../models/Assets");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/", authenticateToken, async (req, res) => {
	try {
		let { data, type } = req.body;
		const user = await User.findOne({ username: req.user.username });
		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}

		if (user.assets) {
			try {
				let assets = await Assets.findById(user.assets);
				assets.assets.push({ data, type });
				await assets.save();
				console.log(assets);
				return res.status(404).json({ assets });
			} catch (err) {
				return res.status(404).json({ error: "assets" });
			}
		} else {
			let assets = new Assets({
				user: user._id,
				assets: [
					{
						data,
						type,
					},
				],
			});

			await assets.save();

			user.assets = assets._id;

			await user.save();
		}
		res.json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "asset post" });
	}
});

module.exports = router;

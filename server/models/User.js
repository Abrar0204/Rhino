const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	bookmarks: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bookmark",
	},
	assets: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Assets",
	},
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = {
	User,
	userSchema,
};

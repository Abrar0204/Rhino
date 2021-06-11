const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
	type: String,
	title: String,
	children: [Map],
	url: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = {
	Bookmark,
	bookmarkSchema,
};

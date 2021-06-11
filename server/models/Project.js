const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
	name: String,
	assets: { type: mongoose.Schema.Types.ObjectId, ref: "Assets" },
	bookmarks: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bookmark",
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	developers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Project = mongoose.model("Project", projectSchema);

module.exports = {
	projectSchema,
	Project,
};

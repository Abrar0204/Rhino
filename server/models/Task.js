const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
	title: String,
	description: String,
	developers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	startDate: String,
	endDate: String,
	priority: String,
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
	status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
	Task,
	taskSchema,
};

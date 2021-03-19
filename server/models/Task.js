const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
	name: Stirng,
	startDate: Date,
	endDate: Date,
	developers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
	Task,
	taskSchema,
};

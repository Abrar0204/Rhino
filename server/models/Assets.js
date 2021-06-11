const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
	assets: [Map],
});

const Assets = mongoose.model("Assets", assetsSchema);

module.exports = {
	Assets,
	assetsSchema,
};

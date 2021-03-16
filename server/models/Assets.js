const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	assets: [Map],
});

const Assets = mongoose.model("Assets", assetsSchema);

module.exports = {
	Assets,
	assetsSchema,
};

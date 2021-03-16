if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

require("./services/connectDB")();

const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

if (process.env.NODE_ENV === "production") {
	//Express serves up static files
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "client", "build")));

	//Express return index.html
	app.get("*", (req, res) =>
		res.sendFile(path.join(__dirname, "client", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("Welcome to Rhino");
	});
}
app.listen(process.env.PORT || 5000, () =>
	console.log("Server started ar port 5000")
);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Welcome to Rhino");
});

app.listen(process.env.PORT || 5000, () =>
	console.log("Server started ar port 5000")
);

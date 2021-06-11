const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).send({ error: "No Auth Token Found" });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
		if (err) {
			return res.status(403).send({ error: "Bad Token" });
		}
		req.user = user;
		next();
	});
};

module.exports = authenticateToken;

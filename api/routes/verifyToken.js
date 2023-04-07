const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
	const token = req.headers.token;
	if(token) {
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if(err) {
				res.status(403).json("Invalid token");;
				return;
			}
			req.user = user;
			console.log("next in verifyToken");
			next();
		});
	} else {
		return res.status(401).json("Not authenticated");
	}
}

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if(req.user.id === req.params.id || req.user.isAdmin) {
			console.log("next in verifyTokenAndAuthorization");
			next();
		} else {
			res.status(403).json("Token is not yours");
		}
	});
}

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if(req.user.isAdmin) {
			if(req.user.id == req.params.id) {
				res.status(403).json("You cannot delete yourself");
			} else {
				next();
			}
		} else {
			res.status(403).json("Not an admin");
		}
	});	
}

module.exports = { verifyTokenAndAuthorization, verifyTokenAndAdmin };

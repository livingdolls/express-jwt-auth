import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verivyToken = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) return next(createError(401, "You are not authenticated!"));

	jwt.verify(token, process.env.JWT_KEY, (err, user) => {
		if (err) return next(createError(403, "Token Invalid!"));

		req.user = user;
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verivyToken(req, res, () => {
		if (req.user.id === parseInt(req.params.id) || req.user.isAdmin) {
			next();
		} else {
			return next(createError(403, "You are not authenticated"));
		}
	});
};

export const verifyAdmin = (req, res, next) => {
	verivyToken(req, res, () => {
		if (req.user.isAdmin === 1) {
			next();
		} else {
			console.log(req.user.isAdmin);
			return next(createError(403, "You are not Admin"));
		}
	});
};

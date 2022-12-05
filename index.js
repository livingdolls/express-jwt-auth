import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// midleware
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wromg!";

	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

app.listen(8800, () => {
	console.log("Connect to backend");
});

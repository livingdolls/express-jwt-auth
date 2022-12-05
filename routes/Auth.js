import express from "express";
import { login, register } from "../controllers/Auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, auth");
});

router.post("/register", register);
router.post("/login", login);

export default router;

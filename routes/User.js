import express from "express";
import {
  deleteUserById,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/User.js";
import { verifyAdmin, verifyUser, verivyToken } from "../utils/verivyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllUser);
router.put("/:id", verifyUser, updateUser);
router.get("/:id", verifyUser, getUserById);
router.delete("/:id", verifyUser, deleteUserById);

export default router;

import express from "express";
import { login, logout, registerUser, testget, deleteUser, updateUser } from "../Controller/User.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/testGet", testget)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id", updateUser)

export default router
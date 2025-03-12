import express from "express";
import { register, verify,  login, logout } from "./../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import express from "express";
import { login, refreshToken } from "./auth-controller";
import { checkUser } from "./auth-middlewares";

const router = express.Router();

router.post("/login", checkUser, login);
router.post("/refresh", refreshToken)

export default router;

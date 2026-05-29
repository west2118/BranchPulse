import express from "express";
import { login, logout, refresh, me } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/vefiryToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyToken, me);

export default router;

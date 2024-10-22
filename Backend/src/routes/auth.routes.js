import { Router } from "express";
import { login,logout,verifyToken,authenticateToken } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login",login);
router.get("/verify",verifyToken)
router.post("/logout",authenticateToken,logout);
export default router;
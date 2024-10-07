import { Router } from "express";
import { login,logout,verifyToken } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login",login);
router.get("/verify",verifyToken)
router.post("/logout",logout);
export default router;
import { Router } from "express";
import { login,register,logout,verifyToken } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.get("/verify",verifyToken)
router.post("/logout",logout);
export default router;
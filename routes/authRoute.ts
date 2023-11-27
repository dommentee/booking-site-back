import express from "express";
const router = express.Router();
import authController from "../controllers/authConttroller";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.post("/verify-email", authController.verifyEmail);
export default router;

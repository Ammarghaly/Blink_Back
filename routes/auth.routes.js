import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import upload from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate, registerSchema, loginSchema } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", upload.single("image"), validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;

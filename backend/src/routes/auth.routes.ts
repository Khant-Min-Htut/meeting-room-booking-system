import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  createUser,
} from "../controllers/auth.controller";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

// Rate limiting temporarily disabled for development
router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);
router.post(
  "/users",
  authenticate,
  authorize("ADMIN"),
  registerValidator,
  validateRequest,
  createUser,
);

export default router;

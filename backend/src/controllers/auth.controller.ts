import { Response } from "express";
import { AuthRequest } from "../types";
import {
  registerService,
  loginService,
  getMeService,
  createUserService,
} from "../services/auth.service";

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { user, token } = await registerService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user, token },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  console.log("1. Login request received");

  try {
    console.log("2. Before loginService");

    const { user, token } = await loginService(req.body);

    console.log("3. loginService completed");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // change this for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    res.status(401).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No user found",
      });
    }

    const user = await getMeService(req.user.id);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

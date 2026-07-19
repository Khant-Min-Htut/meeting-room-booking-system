import { Response } from 'express';
import { AuthRequest } from '../types';
import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from '../services/user.service';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await updateUserService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const result = await deleteUserService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

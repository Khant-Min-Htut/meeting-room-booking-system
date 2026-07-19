import { Response } from 'express';
import { AuthRequest } from '../types';
import {
  getAllRoomsService,
  getRoomByIdService,
  createRoomService,
  updateRoomService,
  deleteRoomService,
  getRoomAvailabilityService
} from '../services/room.service';

export const getAllRooms = async (req: AuthRequest, res: Response) => {
  try {
    const isActive = req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined;
    const rooms = await getAllRoomsService(isActive);

    res.status(200).json({
      success: true,
      message: 'Rooms retrieved successfully',
      data: rooms
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rooms',
      error: error.message
    });
  }
};

export const getRoomById = async (req: AuthRequest, res: Response) => {
  try {
    const room = await getRoomByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Room retrieved successfully',
      data: room
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to retrieve room',
      error: error.message
    });
  }
};

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await createRoomService(req.body);

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create room',
      error: error.message
    });
  }
};

export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await updateRoomService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: room
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update room',
      error: error.message
    });
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const result = await deleteRoomService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to delete room',
      error: error.message
    });
  }
};

export const getRoomAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { startTime, endTime } = req.query;

    if (!startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Start time and end time are required',
        error: 'Missing query parameters'
      });
    }

    const availability = await getRoomAvailabilityService(
      req.params.id,
      new Date(startTime as string),
      new Date(endTime as string)
    );

    res.status(200).json({
      success: true,
      message: 'Availability checked successfully',
      data: availability
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to check availability',
      error: error.message
    });
  }
};

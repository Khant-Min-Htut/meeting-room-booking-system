import { Response } from "express";
import { AuthRequest } from "../types";
import {
  getAllBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
  getMyBookingsService,
  getRoomBookingsService,
  getBookingsGroupedByUserService,
  getBookingSummaryService,
} from "../services/booking.service";

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getAllBookingsService(req.user?.id, req.user?.role);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await getBookingByIdService(
      req.params.id,
      req.user?.id,
      req.user?.role,
    );

    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve booking",
      error: error.message,
    });
  }
};

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No user found",
      });
    }

    const booking = await createBookingService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const updateBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No user found",
      });
    }

    const booking = await updateBookingService(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role,
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

export const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No user found",
      });
    }

    const result = await deleteBookingService(
      req.params.id,
      req.user.id,
      req.user.role,
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No user found",
      });
    }

    const bookings = await getMyBookingsService(req.user.id);

    res.status(200).json({
      success: true,
      message: "My bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
};

export const getRoomBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getRoomBookingsService(req.params.roomId);

    res.status(200).json({
      success: true,
      message: "Room bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve room bookings",
      error: error.message,
    });
  }
};

export const getBookingsGroupedByUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const groupedBookings = await getBookingsGroupedByUserService();

    res.status(200).json({
      success: true,
      message: "Bookings grouped by user retrieved successfully",
      data: groupedBookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve grouped bookings",
      error: error.message,
    });
  }
};

export const getBookingSummary = async (req: AuthRequest, res: Response) => {
  try {
    const summary = await getBookingSummaryService();

    res.status(200).json({
      success: true,
      message: "Booking summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve booking summary",
      error: error.message,
    });
  }
};

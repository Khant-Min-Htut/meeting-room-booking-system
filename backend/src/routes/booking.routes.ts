import { Router } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getMyBookings,
  getRoomBookings,
  getBookingsGroupedByUser,
  getBookingSummary,
} from "../controllers/booking.controller";
import {
  createBookingValidator,
  updateBookingValidator,
} from "../validators/booking.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

router.get("/", authenticate, getAllBookings);
router.get("/my", authenticate, getMyBookings);
router.get("/room/:roomId", authenticate, getRoomBookings);
router.get(
  "/grouped",
  authenticate,
  authorize("ADMIN", "OWNER"),
  getBookingsGroupedByUser,
);
router.get(
  "/summary",
  authenticate,
  authorize("ADMIN", "OWNER"),
  getBookingSummary,
);
router.get("/:id", authenticate, getBookingById);
router.post(
  "/",
  authenticate,
  createBookingValidator,
  validateRequest,
  createBooking,
);
router.put(
  "/:id",
  authenticate,
  updateBookingValidator,
  validateRequest,
  updateBooking,
);
router.delete("/:id", authenticate, deleteBooking);

export default router;

import { Router } from 'express';
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability
} from '../controllers/room.controller';
import { createRoomValidator, updateRoomValidator } from '../validators/room.validator';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

const router = Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/:id/availability', getRoomAvailability);
router.post('/', authenticate, authorize('ADMIN'), createRoomValidator, validateRequest, createRoom);
router.put('/:id', authenticate, authorize('ADMIN'), updateRoomValidator, validateRequest, updateRoom);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteRoom);

export default router;

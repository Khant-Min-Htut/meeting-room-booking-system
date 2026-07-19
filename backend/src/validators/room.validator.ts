import { body } from 'express-validator';

export const createRoomValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Room name is required'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  body('amenities')
    .isArray()
    .withMessage('Amenities must be an array')
    .optional(),
  body('imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .optional()
];

export const updateRoomValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Room name is required')
    .optional(),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer')
    .optional(),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .optional(),
  body('amenities')
    .isArray()
    .withMessage('Amenities must be an array')
    .optional(),
  body('imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .optional()
];

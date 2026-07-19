import { body } from 'express-validator';

export const createBookingValidator = [
  body('roomId')
    .notEmpty()
    .withMessage('Room ID is required'),
  body('startTime')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date'),
  body('endTime')
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date'),
  body('purpose')
    .trim()
    .notEmpty()
    .withMessage('Purpose is required'),
  body('attendeeCount')
    .isInt({ min: 1 })
    .withMessage('Attendee count must be a positive integer')
    .optional(),
  body('notes')
    .trim()
    .optional()
];

export const updateBookingValidator = [
  body('startTime')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date')
    .optional(),
  body('endTime')
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date')
    .optional(),
  body('purpose')
    .trim()
    .notEmpty()
    .withMessage('Purpose is required')
    .optional(),
  body('attendeeCount')
    .isInt({ min: 1 })
    .withMessage('Attendee count must be a positive integer')
    .optional(),
  body('notes')
    .trim()
    .optional(),
  body('status')
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .withMessage('Invalid status')
    .optional()
];

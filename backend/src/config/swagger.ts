import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meeting Room Booking System API',
      version: '1.0.0',
      description: 'API documentation for the Meeting Room Booking System. This API allows users to manage meeting rooms, bookings, and user accounts.',
      contact: {
        name: 'API Support',
        email: 'support@meetingroombooking.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://meeting-room-booking-system-6z5v.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authentication token. Obtain it by logging in via /api/auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            firstName: {
              type: 'string',
              description: 'User first name',
            },
            lastName: {
              type: 'string',
              description: 'User last name',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN', 'OWNER'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation date',
            },
          },
        },
        Room: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Room ID',
            },
            name: {
              type: 'string',
              description: 'Room name',
            },
            description: {
              type: 'string',
              description: 'Room description',
            },
            capacity: {
              type: 'integer',
              description: 'Maximum capacity',
            },
            location: {
              type: 'string',
              description: 'Room location',
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'Room image URL',
            },
            amenities: {
              type: 'string',
              description: 'Comma-separated list of amenities',
            },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Booking ID',
            },
            roomId: {
              type: 'string',
              description: 'Room ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'Booking start time',
            },
            endTime: {
              type: 'string',
              format: 'date-time',
              description: 'Booking end time',
            },
            purpose: {
              type: 'string',
              description: 'Meeting purpose',
            },
            attendeeCount: {
              type: 'integer',
              description: 'Number of attendees',
            },
            notes: {
              type: 'string',
              description: 'Additional notes',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
              description: 'Booking status',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

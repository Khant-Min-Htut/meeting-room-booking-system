# Meeting Room Booking System - Backend

## Tech Stack
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- express-validator

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up database:
```bash
npx prisma generate
npx prisma migrate dev
```

4. Seed database (optional):
```bash
npm run seed
```

## Development

Run development server:
```bash
npm run dev
```

## Production

Build and start:
```bash
npm run build
npm start
```

## API Routes

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user

### Rooms
- GET `/api/rooms` - Get all rooms
- GET `/api/rooms/:id` - Get room by ID
- POST `/api/rooms` - Create room (admin only)
- PUT `/api/rooms/:id` - Update room (admin only)
- DELETE `/api/rooms/:id` - Delete room (admin only)
- GET `/api/rooms/:id/availability` - Check room availability

### Bookings
- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/my` - Get current user's bookings
- GET `/api/bookings/room/:roomId` - Get bookings for a room
- GET `/api/bookings/:id` - Get booking by ID
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id` - Update booking
- DELETE `/api/bookings/:id` - Delete booking

### Users
- GET `/api/users` - Get all users (admin only)
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user (admin only)

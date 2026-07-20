# Meeting Room Booking System

A production-ready meeting room booking system with full-stack implementation.

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- express-validator

### Frontend

- React
- Vite
- TypeScript
- TailwindCSS
- React Router
- Axios
- React Hook Form
- Zod

### Deployment

- Backend: Render
- Frontend: Vercel
- Database: Neon PostgreSQL

## Project Structure

```
meeting-room-booking-system/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Request validators
│   │   └── app.ts           # Express app setup
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── frontend/                # React/Vite SPA
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── pages/           # Page components
│   │   ├── context/         # React contexts
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Root component
│   └── package.json
└── README.md
```

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Role-based access control (USER/OWNER/ADMIN)
- Protected routes

### Room Management

- Browse available meeting rooms
- View room details and amenities
- Admin can create, update, and delete rooms
- Room availability checking

### Booking System

- Book meeting rooms
- View booking history
- Cancel bookings
- Conflict prevention (no overlapping bookings)
- Booking status tracking

### User Features

- User profile management
- View personal booking history
- Cancel own bookings

### Admin Features

- Manage all rooms
- View all bookings
- Create, delete, and manage users
- Change user roles

### Owner Features

- View all bookings
- Delete any booking
- View bookings grouped by user
- View usage summary and analytics

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up database:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Seed database (optional):

```bash
npm run seed
```

6. Run development server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run development server:

```bash
npm run dev
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

## Default Users

After running the seed script, you can login with:

**Admin User:**

- Email: admin@example.com
- Password: admin123

**Regular User:**

- Email: user@example.com
- Password: user123

<!-- ## Deployment

### Backend (Render)

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database (Neon)

1. Create a PostgreSQL database on Neon
2. Copy connection string to `.env` file
3. Run migrations: `npx prisma migrate deploy`
 -->

## License

MIT

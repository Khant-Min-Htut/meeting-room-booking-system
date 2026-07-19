# Meeting Room Booking System - Frontend

## Tech Stack
- React
- Vite
- TypeScript
- TailwindCSS
- React Router
- Axios
- React Hook Form
- Zod
- Lucide React

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

## Development

Run development server:
```bash
npm run dev
```

## Production

Build and preview:
```bash
npm run build
npm run preview
```

## Pages

- `/login` - User login
- `/register` - User registration
- `/` - Dashboard (protected)
- `/rooms` - Browse and book rooms (protected)
- `/bookings` - View my bookings (protected)
- `/bookings/new` - Create new booking (protected)

## Features

- User authentication with JWT
- Browse available meeting rooms
- Book meeting rooms
- View booking history
- Cancel bookings
- Admin features (create rooms)

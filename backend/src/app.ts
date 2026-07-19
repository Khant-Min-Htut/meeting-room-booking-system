import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import corsConfig from "./config/cors";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { generalLimiter } from "./middleware/rateLimit.middleware";

// Routes
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";
import bookingRoutes from "./routes/booking.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Rate limiting temporarily disabled for development
// app.use(generalLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;

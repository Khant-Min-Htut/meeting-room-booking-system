import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://meeting-room-booking-system-two.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);

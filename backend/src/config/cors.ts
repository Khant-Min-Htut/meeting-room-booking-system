import cors from "cors";

const corsOptions = {
  origin: [
    "https://meeting-room-booking-system-seven.vercel.app",
    "https://meeting-room-booking-system-khant-min-htuts-projects.vercel.app",
    "https://meeting-room-booking-system-git-main-khant-min-htuts-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);

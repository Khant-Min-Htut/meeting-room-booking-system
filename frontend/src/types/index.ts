export type UserRole = "USER" | "ADMIN" | "OWNER";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  location: string;
  amenities: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    bookings: number;
  };
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  purpose: string;
  attendeeCount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  room?: Room;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface BookingInput {
  roomId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendeeCount?: number;
  notes?: string;
}

export interface RoomInput {
  name: string;
  description?: string;
  capacity: number;
  location: string;
  amenities: string;
  imageUrl?: string;
}

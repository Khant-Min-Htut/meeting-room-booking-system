import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  cookies: any;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RoomInput {
  name: string;
  description?: string;
  capacity: number;
  location: string;
  amenities: string;
  imageUrl?: string;
}

export interface BookingInput {
  roomId: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  attendeeCount?: number;
  notes?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

import prisma from '../config/database';
import { RoomInput } from '../types';

export const getAllRoomsService = async (isActive?: boolean) => {
  const rooms = await prisma.room.findMany({
    where: isActive !== undefined ? { isActive } : undefined,
    include: {
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  return rooms;
};

export const getRoomByIdService = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      _count: {
        select: { bookings: true }
      }
    }
  });

  if (!room) {
    throw new Error('Room not found');
  }

  return room;
};

export const createRoomService = async (data: RoomInput) => {
  const room = await prisma.room.create({
    data
  });

  return room;
};

export const updateRoomService = async (id: string, data: Partial<RoomInput>) => {
  const room = await prisma.room.update({
    where: { id },
    data
  });

  return room;
};

export const deleteRoomService = async (id: string) => {
  await prisma.room.delete({
    where: { id }
  });

  return { message: 'Room deleted successfully' };
};

export const getRoomAvailabilityService = async (roomId: string, startTime: Date, endTime: Date) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    throw new Error('Room not found');
  }

  const conflictingBookings = await prisma.booking.findMany({
    where: {
      roomId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      OR: [
        {
          AND: [
            { startTime: { lte: startTime } },
            { endTime: { gt: startTime } }
          ]
        },
        {
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gte: endTime } }
          ]
        },
        {
          AND: [
            { startTime: { gte: startTime } },
            { endTime: { lte: endTime } }
          ]
        }
      ]
    }
  });

  return {
    available: conflictingBookings.length === 0,
    conflictingBookings
  };
};

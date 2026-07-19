import prisma from "../config/database";
import { BookingInput } from "../types";
import { isOverlapping, isValidBookingTime } from "../utils/date.util";

export const getAllBookingsService = async (
  userId?: string,
  userRole?: string,
) => {
  const bookings = await prisma.booking.findMany({
    where:
      userRole === "ADMIN" || userRole === "OWNER" ? undefined : { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      room: true,
    },
    orderBy: { startTime: "desc" },
  });

  return bookings;
};

export const getBookingByIdService = async (
  id: string,
  userId?: string,
  userRole?: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      room: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (userRole !== "ADMIN" && booking.userId !== userId) {
    throw new Error("Access denied");
  }

  return booking;
};

export const createBookingService = async (
  data: BookingInput,
  userId: string,
) => {
  if (!isValidBookingTime(data.startTime, data.endTime)) {
    throw new Error("Invalid booking time");
  }

  const room = await prisma.room.findUnique({
    where: { id: data.roomId },
  });

  if (!room || !room.isActive) {
    throw new Error("Room not available");
  }

  const existingBookings = await prisma.booking.findMany({
    where: {
      roomId: data.roomId,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  for (const booking of existingBookings) {
    if (
      isOverlapping(
        data.startTime,
        data.endTime,
        booking.startTime,
        booking.endTime,
      )
    ) {
      throw new Error("Room is already booked for this time slot");
    }
  }

  const booking = await prisma.booking.create({
    data: {
      ...data,
      userId,
      status: "CONFIRMED",
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      room: true,
    },
  });

  return booking;
};

export const updateBookingService = async (
  id: string,
  data: Partial<BookingInput>,
  userId: string,
  userRole: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (userRole !== "ADMIN" && booking.userId !== userId) {
    throw new Error("Access denied");
  }

  if (data.startTime || data.endTime) {
    const startTime = data.startTime || booking.startTime;
    const endTime = data.endTime || booking.endTime;

    if (!isValidBookingTime(startTime, endTime)) {
      throw new Error("Invalid booking time");
    }

    const existingBookings = await prisma.booking.findMany({
      where: {
        roomId: booking.roomId,
        status: { in: ["PENDING", "CONFIRMED"] },
        id: { not: id },
      },
    });

    for (const existingBooking of existingBookings) {
      if (
        isOverlapping(
          startTime,
          endTime,
          existingBooking.startTime,
          existingBooking.endTime,
        )
      ) {
        throw new Error("Room is already booked for this time slot");
      }
    }
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      room: true,
    },
  });

  return updatedBooking;
};

export const deleteBookingService = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (
    userRole !== "ADMIN" &&
    userRole !== "OWNER" &&
    booking.userId !== userId
  ) {
    throw new Error("Access denied");
  }

  await prisma.booking.delete({
    where: { id },
  });

  return { message: "Booking cancelled successfully" };
};

export const getMyBookingsService = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      room: true,
    },
    orderBy: { startTime: "desc" },
  });

  return bookings;
};

export const getRoomBookingsService = async (roomId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { roomId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { startTime: "desc" },
  });

  return bookings;
};

export const getBookingsGroupedByUserService = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      room: true,
    },
    orderBy: { startTime: "desc" },
  });

  const grouped = bookings.reduce((acc: any, booking) => {
    const userId = booking.userId;
    if (!acc[userId]) {
      acc[userId] = {
        user: booking.user,
        bookings: [],
        totalBookings: 0,
      };
    }
    acc[userId].bookings.push(booking);
    acc[userId].totalBookings++;
    return acc;
  }, {});

  return Object.values(grouped);
};

export const getBookingSummaryService = async () => {
  const totalBookings = await prisma.booking.count();
  const bookingsByStatus = await prisma.booking.groupBy({
    by: ["status"],
    _count: true,
  });

  const bookingsByUser = await prisma.booking.groupBy({
    by: ["userId"],
    _count: true,
    orderBy: {
      _count: {
        userId: "desc",
      },
    },
  });

  const usersWithCounts = await Promise.all(
    bookingsByUser.map(async (item) => {
      const user = await prisma.user.findUnique({
        where: { id: item.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      return {
        user,
        count: item._count,
      };
    }),
  );

  return {
    totalBookings,
    bookingsByStatus,
    bookingsByUser: usersWithCounts,
  };
};

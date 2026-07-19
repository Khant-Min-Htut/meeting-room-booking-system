import prisma from '../config/database';

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { bookings: true }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUserService = async (id: string, data: any) => {
  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return user;
};

export const deleteUserService = async (id: string) => {
  await prisma.user.delete({
    where: { id }
  });

  return { message: 'User deleted successfully' };
};

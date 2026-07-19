import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Room } from '../types';

export const useRooms = (isActive?: boolean) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = isActive !== undefined ? { isActive } : {};
      const response = await api.get('/api/rooms', { params });
      setRooms(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData: any) => {
    try {
      const response = await api.post('/api/rooms', roomData);
      setRooms([...rooms, response.data.data]);
      return response.data.data;
    } catch (err: any) {
      throw err;
    }
  };

  const updateRoom = async (id: string, roomData: any) => {
    try {
      const response = await api.put(`/api/rooms/${id}`, roomData);
      setRooms(rooms.map((r) => (r.id === id ? response.data.data : r)));
      return response.data.data;
    } catch (err: any) {
      throw err;
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      await api.delete(`/api/rooms/${id}`);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [isActive]);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};

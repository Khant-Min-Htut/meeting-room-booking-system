import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Booking } from '../types';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/bookings');
      setBookings(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: any) => {
    try {
      const response = await api.post('/api/bookings', bookingData);
      setBookings([...bookings, response.data.data]);
      return response.data.data;
    } catch (err: any) {
      throw err;
    }
  };

  const updateBooking = async (id: string, bookingData: any) => {
    try {
      const response = await api.put(`/api/bookings/${id}`, bookingData);
      setBookings(bookings.map((b) => (b.id === id ? response.data.data : b)));
      return response.data.data;
    } catch (err: any) {
      throw err;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await api.delete(`/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
  };
};

export const useMyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/bookings/my');
      setBookings(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return { bookings, loading, error, fetchMyBookings };
};

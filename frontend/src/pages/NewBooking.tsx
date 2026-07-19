import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingInput } from "../lib/validations";
import { useRooms } from "../hooks/useRooms";
import { useBookings } from "../hooks/useBookings";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const NewBooking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { rooms, loading } = useRooms(true);
  const { createBooking } = useBookings();
  const [selectedRoom, setSelectedRoom] = useState<string>(
    searchParams.get("roomId") || "",
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomId: selectedRoom,
    },
  });

  useEffect(() => {
    if (searchParams.get("roomId")) {
      setSelectedRoom(searchParams.get("roomId") || "");
    }
  }, [searchParams]);

  const onSubmit = async (data: any) => {
    try {
      // Convert datetime-local format to ISO 8601
      const startTime = new Date(data.startTime);
      const endTime = new Date(data.endTime);
      const now = new Date();

      // Validate booking time
      if (startTime < now) {
        alert("Start time must be in the future");
        return;
      }

      if (endTime <= startTime) {
        alert("End time must be after start time");
        return;
      }

      const bookingData = {
        ...data,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };
      await createBooking(bookingData);
      navigate("/bookings");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book a Room</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details to book a meeting room
        </p>
      </div>

      {loading ?
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      : <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Room
              </label>
              <select
                {...register("roomId")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">Choose a room...</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.location} (Capacity: {room.capacity})
                  </option>
                ))}
              </select>
              {errors.roomId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.roomId.message}
                </p>
              )}
            </div>

            {selectedRoomData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedRoomData.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedRoomData.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoomData.amenities
                    ?.split(",")
                    .map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                        {amenity.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  {...register("startTime")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  {...register("endTime")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <Input
              label="Purpose"
              {...register("purpose")}
              error={errors.purpose?.message}
            />

            <Input
              label="Number of Attendees"
              type="number"
              {...register("attendeeCount", { valueAsNumber: true })}
              error={errors.attendeeCount?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.notes.message}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/rooms")}
                className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

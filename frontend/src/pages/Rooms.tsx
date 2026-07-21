import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Plus } from "lucide-react";
import { useRooms } from "../hooks/useRooms";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { roomSchema } from "../lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Rooms: React.FC = () => {
  const { rooms, loading, createRoom } = useRooms(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(roomSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createRoom(data);
      setIsModalOpen(false);
      reset();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create room");
    }
  };

  const handleBookRoom = (roomId: string) => {
    navigate(`/bookings/new?roomId=${roomId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Meeting Rooms
          </h1>
          <p className="mt-2 text-gray-600">
            Browse and book available meeting rooms
          </p>
        </div>
        {user?.role === "ADMIN" && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span>Add Room</span>
          </Button>
        )}
      </div>

      {loading ?
        <p className="text-gray-600">Loading rooms...</p>
      : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              {room.imageUrl && (
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              )}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {room.name}
                </h3>
                {room.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {room.description}
                  </p>
                )}
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{room.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{room.capacity} people</span>
                  </div>
                </div>
                {room.amenities && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.split(",").map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {amenity.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <Button
                  onClick={() => handleBookRoom(room.id)}
                  className="w-full">
                  Book This Room
                </Button>
              </div>
            </div>
          ))}
        </div>
      }

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Room">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Room Name"
            {...register("name")}
            error={errors.name?.message?.toString()}
          />
          <Input
            label="Description"
            {...register("description")}
            error={errors.description?.message?.toString()}
          />
          <Input
            label="Capacity"
            type="number"
            {...register("capacity", { valueAsNumber: true })}
            error={errors.capacity?.message?.toString()}
          />
          <Input
            label="Location"
            {...register("location")}
            error={errors.location?.message?.toString()}
          />
          <Input
            label="Image URL"
            {...register("imageUrl")}
            error={errors.imageUrl?.message?.toString()}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              {...register("amenities")}
              placeholder="e.g., Projector, Whiteboard, WiFi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.amenities && (
              <p className="mt-1 text-sm text-red-600">
                {errors.amenities.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Creating..." : "Create Room"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

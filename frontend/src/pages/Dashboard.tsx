import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, DoorOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBookings, useMyBookings } from "../hooks/useBookings";
import { formatDateTime } from "../lib/utils";
import { Button } from "../components/ui/Button";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings: allBookings, loading: allLoading } = useBookings();
  const { bookings: myBookings, loading: myLoading } = useMyBookings();
  const navigate = useNavigate();

  // Admin and Owner see all bookings, regular users see only their own
  const bookings =
    user?.role === "ADMIN" || user?.role === "OWNER" ? allBookings : myBookings;
  const loading =
    user?.role === "ADMIN" || user?.role === "OWNER" ? allLoading : myLoading;

  const upcomingBookings = bookings
    .filter(
      (b) => new Date(b.startTime) > new Date() && b.status !== "CANCELLED",
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's an overview of your meeting room bookings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingBookings.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DoorOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Quick Action</p>
              <Button
                size="sm"
                onClick={() => navigate("/rooms")}
                className="mt-2">
                Book a Room
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
        </div>
        <div className="p-6">
          {loading ?
            <p className="text-gray-600">Loading...</p>
          : upcomingBookings.length === 0 ?
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No upcoming bookings</p>
              <Button onClick={() => navigate("/rooms")}>Book a Room</Button>
            </div>
          : <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {booking.room?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.purpose}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDateTime(booking.startTime)} -{" "}
                        {formatDateTime(booking.endTime)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "CONFIRMED" ?
                          "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useMyBookings } from "../hooks/useBookings";
import { formatDateTime } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { Trash2 } from "lucide-react";

export const Bookings: React.FC = () => {
  const { bookings, loading, deleteBooking } = useMyBookings();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await deleteBooking(id);
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to cancel booking");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage your meeting room bookings
        </p>
      </div>

      {loading ?
        <p className="text-gray-600">Loading bookings...</p>
      : bookings.length === 0 ?
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
          <p className="text-gray-600 mb-4">No bookings found</p>
          <Button onClick={() => (window.location.href = "/rooms")}>
            Book a Room
          </Button>
        </div>
      : <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.room?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {booking.room?.location}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status,
                    )}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">{booking.purpose}</p>
                    {booking.attendeeCount && (
                      <p className="text-gray-500">
                        {booking.attendeeCount} attendees
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900">
                      {formatDateTime(booking.startTime)}
                    </p>
                    <p className="text-gray-500">
                      to {formatDateTime(booking.endTime)}
                    </p>
                  </div>
                </div>
                {booking.status !== "CANCELLED" &&
                  booking.status !== "COMPLETED" && (
                    <div className="mt-4 pt-4 border-t">
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                        <span>Cancel booking</span>
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.room?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.room?.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.purpose}
                      </div>
                      {booking.attendeeCount && (
                        <div className="text-sm text-gray-500">
                          {booking.attendeeCount} attendees
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(booking.startTime)}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {formatDateTime(booking.endTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status,
                        )}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status !== "CANCELLED" &&
                          booking.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel booking">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    </div>
  );
};

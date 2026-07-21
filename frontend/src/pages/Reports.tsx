import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupedBookings, setGroupedBookings] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "ADMIN" && user?.role !== "OWNER") {
      navigate("/");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [groupedRes, summaryRes] = await Promise.all([
        api.get("/api/bookings/grouped"),
        api.get("/api/bookings/summary"),
      ]);
      setGroupedBookings(groupedRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="mt-2 text-gray-600">
          View booking statistics and user activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs sm:text-sm text-gray-600">Total Bookings</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {summary?.totalBookings || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {summary?.bookingsByUser?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs sm:text-sm text-gray-600">
                Status Breakdown
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                {summary?.bookingsByStatus?.map((status: any) => (
                  <span
                    key={status.status}
                    className="text-xs px-2 py-1 rounded bg-gray-100">
                    {status.status}: {status._count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings by User */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">
            Top Users by Bookings
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {summary?.bookingsByUser?.slice(0, 10).map((item: any) => (
              <div
                key={item.user.id}
                className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.user.firstName} {item.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{item.user.email}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xl sm:text-2xl font-bold text-primary-600">
                    {item.count}
                  </p>
                  <p className="text-xs text-gray-500">bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Grouped by User */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">Bookings by User</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            {groupedBookings.map((group: any) => (
              <div key={group.user.id} className="border rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {group.user.firstName[0]}
                        {group.user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {group.user.firstName} {group.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {group.user.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {group.totalBookings} bookings
                  </span>
                </div>
                <div className="space-y-2">
                  {group.bookings.slice(0, 5).map((booking: any) => (
                    <div
                      key={booking.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded text-sm gap-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.room?.name}
                        </p>
                        <p className="text-gray-500">{booking.purpose}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">
                          {new Date(booking.startTime).toLocaleDateString()}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === "CONFIRMED" ?
                              "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {group.bookings.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{group.bookings.length - 5} more bookings
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

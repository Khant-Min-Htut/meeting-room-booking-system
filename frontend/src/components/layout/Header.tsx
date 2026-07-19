import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, Home, User, BarChart3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1
              className="text-xl font-bold text-primary-600 cursor-pointer"
              onClick={() => navigate("/")}>
              Meeting Room Booking
            </h1>
            {isAuthenticated && (
              <nav className="flex space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => navigate("/rooms")}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Rooms</span>
                </button>
                <button
                  onClick={() => navigate("/bookings")}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>My Bookings</span>
                </button>
                {user?.role === "ADMIN" && (
                  <button
                    onClick={() => navigate("/users")}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Users</span>
                  </button>
                )}
                {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                  <button
                    onClick={() => navigate("/reports")}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    <span>Reports</span>
                  </button>
                )}
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ?
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            : <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

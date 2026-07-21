import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, Home, User, BarChart3, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-xl font-bold text-primary-600 cursor-pointer"
              onClick={() => navigate("/")}>
              Meeting Room Booking
            </h1>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-4">
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

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ?
              <>
                <div className="hidden sm:flex items-center space-x-2">
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
                  <span className="hidden sm:inline">Logout</span>
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

            {/* Mobile menu button */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100">
                {mobileMenuOpen ?
                  <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigate("/rooms");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Rooms</span>
              </button>
              <button
                onClick={() => {
                  navigate("/bookings");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                <Calendar className="w-4 h-4" />
                <span>My Bookings</span>
              </button>
              {user?.role === "ADMIN" && (
                <button
                  onClick={() => {
                    navigate("/users");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                  <User className="w-4 h-4" />
                  <span>Users</span>
                </button>
              )}
              {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                <button
                  onClick={() => {
                    navigate("/reports");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reports</span>
                </button>
              )}
              <div className="sm:hidden flex items-center space-x-2 px-3 py-2 text-gray-600">
                <User className="w-5 h-5" />
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

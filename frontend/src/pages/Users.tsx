import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import api from "../lib/api";

export const Users: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "USER",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/users");
      setUsers(response.data.data);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put(`/api/users/${editingUser.id}`, {
          role: formData.role,
        });
      } else {
        await api.post("/api/auth/users", formData);
      }
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "USER",
      });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? Their bookings will also be deleted.",
      )
    ) {
      return;
    }
    try {
      await api.delete(`/api/users/${userId}`);
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "USER",
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage system users and their roles
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </Button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {u.firstName[0]}
                    {u.lastName[0]}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {u.firstName} {u.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.role === "ADMIN" ? "bg-purple-100 text-purple-800"
                    : u.role === "OWNER" ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                  }`}>
                  {u.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bookings:</span>
                <span className="text-gray-900">{u._count?.bookings || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">
                  {new Date(u.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => handleEdit(u)}
                className="text-primary-600 hover:text-primary-900">
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-600 hover:text-red-900"
                disabled={u.id === user?.id}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bookings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {u.firstName[0]}
                        {u.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {u.firstName} {u.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      u.role === "ADMIN" ? "bg-purple-100 text-purple-800"
                      : u.role === "OWNER" ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                    }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u._count?.bookings || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(u)}
                    className="text-primary-600 hover:text-primary-900 mr-4">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={u.id === user?.id}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add New User"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!!editingUser}
          />
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            disabled={!!editingUser}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            disabled={!!editingUser}
          />
          {!editingUser && (
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="USER">User</option>
              <option value="OWNER">Owner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingUser ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [updatedData, setUpdatedData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // For selected user to update or delete

  const apiUrl = 'http://localhost:5000/api/users';

  // Fetch all users (admin only)
  const getUsers = async () => {
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  // Update user by email
  const updateUser = async (email) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${selectedUser._id}`,
        updatedData,
        { withCredentials: true }
      );
      setUsers(users.map(user => user._id === selectedUser._id ? response.data : user)); // Update the users list
      toast.success('User updated successfully');
    } catch (err) {
      setError('Failed to update user');
      toast.error('Failed to update user');
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/${userId}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the list
      toast.success('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
      toast.error('Failed to delete user');
    }
  };

  // Select a user from the list to update
  const selectUser = (user) => {
    setSelectedUser(user);
    setUpdatedData({ name: user.name, email: user.email });
  };

  // Handle input change for update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fetch all users on component mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center text-primary mt-4">Admin Panel</h2>

      {/* Display any error messages */}
      {error && <div className="alert alert-danger text-center mt-3">{error}</div>}

      {/* Display all users */}
      <div className="mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-around w-auto">
          <h4 className="text-center mb-3">All Users</h4>
          <Link to="/" className="btn btn-link text-decoration-none mb-4">
            <ArrowLeft className="me-2" />
            <span>Go back</span>
          </Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='d-flex flex-wrap gap-2'>
                  <button
                    className="btn btn-primary"
                    onClick={() => selectUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User update form */}
      {selectedUser && (
        <div className="card mt-4 p-4 shadow">
          <h4 className="text-center mb-3">Update User</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Update Name"
                value={updatedData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Update Email"
                value={updatedData.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-wrap justify-content-between">
              <button
                type="button"
                onClick={() => updateUser(selectedUser.email)}
                className="btn btn-success"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={() => deleteUser(selectedUser._id)}
                className="btn btn-danger"
              >
                Delete User
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

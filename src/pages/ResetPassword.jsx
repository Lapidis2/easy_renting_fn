import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post(`/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Reset failed.');
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        {message && (
          <p className={`mb-4 text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
        )}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary w-full">Update Password</button>
      </form>
    </div>
  );
}

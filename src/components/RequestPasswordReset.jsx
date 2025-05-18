import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/request-password-reset', { email });
      setMessage(res.data.message);
      setSuccess(true);

      setTimeout(() => {
        setMessage('');
        setEmail('');
        setSuccess(false);
      }, 3000); // Clear message after 3 seconds
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Your Password?</h2>
        {message && (
          <p className={`mb-4 text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
        )}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary w-full">Send Reset Link</button>
      </form>
    </div>
  );
}

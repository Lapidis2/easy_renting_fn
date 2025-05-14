import React, { useState } from "react";
import axios from "axios";
const UpdateUserRole = ({user}) => {
  const [userName, setUserName] = useState(user.username.toUpperCase());
  const [newRole, setNewRole] = useState("user");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  console.log('user from props',user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token"); // or from context
      const Id = user._id;
      console.log('user from local strg',user);
  
      if (!token) {
        setError("No token found. Please log in.");
        return;
        }
      const response = await axios.put(
        `https://easy-renting-bn.onrender.com/api/user/${Id}/role`,
        { role: newRole },
        
      );

      setMessage(`Role updated to ${response.data.role || newRole} successfully.`);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Update User Role
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ fontWeight: "500" }}>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter user ID"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              marginTop: "0.25rem"
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "500" }}>Select Role</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              marginTop: "0.25rem"
            }}
          >
            <option value="buyer">Buyer</option>
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
            <option value="saler">Saler</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Update Role
        </button>

        {message && <p style={{ color: "green", fontWeight: "500" }}>{message}</p>}
        {error && <p style={{ color: "red", fontWeight: "500" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateUserRole;

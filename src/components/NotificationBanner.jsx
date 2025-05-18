// components/NotificationBanner.jsx
import React,{ useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const NotificationBanner = () => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axiosClient.get("/notifications");
        const data = await res.json();
        if (data.length > 0) {
          const latest = data[0]; // assumes the most recent is first
          const dismissed = sessionStorage.getItem("dismissed_" + latest._id);

          if (!dismissed) {
            setNotification(latest);
            setVisible(true);
          }
        }
      } catch (err) {
        console.error("Failed to load notification:", err);
      }
    };

    fetchNotification();
  }, []);

  const handleClose = () => {
    if (notification?._id) {
      sessionStorage.setItem("dismissed_" + notification._id, "true");
    }
    setVisible(false);
  };

  if (!notification || !visible) return null;

  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-50">
      <div>
        <strong>{notification.title}</strong>
        <p>{notification.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-xl font-bold hover:text-red-500"
      >
        &times;
      </button>
    </div>
  );
};

export default NotificationBanner;

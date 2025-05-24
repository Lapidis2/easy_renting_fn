import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const NotificationBanner = () => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axiosClient.get("/notifications");
        const data = res.data; 
        if (data.length > 0) {
          const latest = data[0]; 
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
    <div className="bg-black  text-white shadow-md flex justify-between items-center fixed top-0 w-full z-100">
      <div className="flex items-center space-x-4 flex-grow ">
        <strong>{notification.title}</strong>
        <p>{notification.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="mr-4 text-md font-bold hover:text-red-500"
      >
        &times;
      </button>
    </div>
  );
};

export default NotificationBanner;

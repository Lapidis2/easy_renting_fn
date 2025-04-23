import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function RequestedProperties() {
  const [requestedProperties, setRequestedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestedProperties = async () => {
      try {
        const response = await axios.get("https://easy-renting-bn.onrender.com/api/request-property");
        setRequestedProperties(response.data.data);
      } catch (err) {
        console.error("Error fetching requested properties:", err);
        setError("Failed to fetch requested properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedProperties();
  }, []);

  if (loading) {
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  if (!Array.isArray(requestedProperties) || requestedProperties.length === 0) {
    return <h2 className="text-center text-gray-500 mt-10">No requested properties found.</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Requested Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requestedProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Redirect to Requested Properties as the default page */}
        <Outlet />
      </div>
    </div>
  );
};

// Export components individually

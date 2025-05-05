// src/admin-panel/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import DashboardWidgets from "../components/DashboardWidgets";
import QuickActions from "../components/QuickActions";
import axiosClient from "../../api/axiosClient";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [viewingProperty, setViewingProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const fetchProperties = async () => {
    try {
      const res = await axiosClient.get("/get-properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    await axiosClient.delete(`/delete-property/${id}`);
    fetchProperties();
  };

  const handleApprove = async (id) => {
    await axiosClient.put(`/update-property/${id}`, {
      status: "Available",
    });
    fetchProperties();
  };

  const handleEdit = (property) => setEditingProperty(property);
  const handleView = (property) => setViewingProperty(property);
  

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <DashboardWidgets />
      <QuickActions />

      {/* Property Cards */}
      <h3 className="text-xl font-bold my-4">All Properties</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {console.log('Property:', currentProperties)} */}
        {currentProperties.map((property) => (
          
          <PropertyCard
            key={property._id}
            property={property}
            onDelete={handleDelete}
            onApprove={handleApprove}
            onEdit={handleEdit}
            onView={handleView}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === num + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </MainLayout>
  );
}

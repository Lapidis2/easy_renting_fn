// admin-panel/components/PropertyCard.jsx
import React from 'react';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';

export default function PropertyCard({ property, onEdit, onDelete, onApprove, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-1/2 lg:w-[400px] m-2">
      <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-xl">{property.title}</h2>
        <p className="text-sm text-gray-600">{property.location}</p>
        <p className="text-gray-700 text-sm mt-1">{property.description.slice(0, 60)}...</p>
        <p className="font-semibold text-green-600 mt-2">Price: ${property.price}</p>
        <div className="text-sm text-gray-500 mt-1">Status: {property.status}</div>

<div className="flex flex-wrap justify-center mt-4 space-x-2">
  <button 
    onClick={() => onView(property)} 
    title="View"
    className="flex items-center justify-center text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md p-2 w-auto mt-2 cursor-pointer">
    <FiEye className="mr-2" />
    <span className="hidden sm:inline">View</span>
  </button>

  <button 
    onClick={() => onEdit(property)} 
    title="Edit"
    className="flex items-center justify-center text-green-600 bg-green-100 hover:bg-green-200 rounded-md p-2 w-auto mt-2 cursor-pointer">
    <FiEdit className="mr-2" />
    <span className="hidden sm:inline">Edit</span>
  </button>

  <button 
    onClick={() => onDelete(property._id)} 
    title="Delete"
    className="flex items-center justify-center text-red-600 bg-red-100 hover:bg-red-200 rounded-md p-2 w-auto mt-2 cursor-pointer">
    <FiTrash2 className="mr-2" />
    <span className="hidden sm:inline">Delete</span>
  </button>

  {property.status !== "Approved" && (
    <button 
      onClick={() => onApprove(property._id)} 
      title="Approve"
      className="flex items-center justify-center text-purple-600 bg-purple-100 hover:bg-purple-200 rounded-md p-2 w-auto mt-2 cursor-pointer">
      <FiCheckCircle className="mr-2" />
      <span className="hidden sm:inline">Approve</span>
    </button>
  )}
</div>

      </div>
    </div>
  );
}

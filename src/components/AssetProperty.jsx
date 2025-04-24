import React from "react";

const AssetProperty = ({ assets = [], type }) => {
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3  mb-6">

      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
        {displayType}Other Assets
      </h2>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {assets.length > 0 ? (
          assets.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5"
            >
              <img
                src={item.image || "https://placehold.co/300x200?text=No+Image"}
                alt={item.name || "No Image"}
                className="w-full h-48 object-cover rounded-md mb-4"
              />


              <h3 className="text-xl font-semibold text-blue-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-700 font-medium mb-1">Price: {item.price}</p>
              <p className="text-sm text-gray-500 mb-2">Status: {item.status}</p>

              {/* Car & Motorcycle */}
              {["Car", "Motorcycle"].includes(displayType) && (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Transmission: {item.transmission || "N/A"}</p>
                  <p>Fuel: {item.fuel || "N/A"}</p>
                  <p>Certified: {item.certified ? "✅ Yes" : "❌ No"}</p>
                  <p>Inspected: {item.inspected ? "✅ Yes" : "❌ No"}</p>
                  {item.warranty && <p>Warranty: {item.warranty}</p>}
                  {item.rentalPrice && <p>Rental Price: {item.rentalPrice}</p>}
                  {item.rentDuration && <p>Rent Duration: {item.rentDuration}</p>}
                </div>
              )}

              {/* Land */}
              {displayType === "Land" && (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Location: {item.location}</p>
                  <p>Size: {item.size}</p>
                </div>
              )}

              {/* Clothes */}
              {displayType === "Clothes" && (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Condition: {item.condition}</p>
                  <p>Size: {item.sizeCloth}</p>
                </div>
              )}

              {/* Other */}
              {displayType === "Other" && (
                <div className="text-sm text-gray-700 space-y-2">
                  <p>{item.description || "No description provided."}</p>
                </div>
              )}

              {/* Common Fields */}
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                {item.contact && <p>Contact: {item.contact}</p>}
                {item.timeAgo && <p>Posted: {item.timeAgo}</p>}
              </div>
            </div>
          ))
        ) : (
        <p className="text-center text-gray-500">No Other Assets Found.</p>
        )}
      </div>
    </div>
  );
};

export default AssetProperty;
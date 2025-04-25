import React from "react";
import {  useNavigate } from "react-router-dom";

const AssetProperty = ({ assets = []}) => {

  if (assets.length === 0) {
    return <div className="text-center py-4 text-gray-500">No Asset Found.</div>;
  }
  const navigate = useNavigate();

  const NoAssets = (
    <div className="text-center py-20 text-lg">
      No assets available for this type.
    </div>
  );

  const handleViewDetails = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <div className="mx-auto mt-30">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Other Property
      </h2>

      {assets.length === 0 ? (
        NoAssets
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {assets.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5"
            >
              <div className="relative">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {item.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-blue-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-700 font-medium mb-1">Price: {item.price}</p>
              {item.owner && (
                <p className="text-sm text-gray-600 mb-1">Owner: {item.owner}</p>
              )}
              {item.location && (
                <p className="text-sm text-gray-600 mb-1">Location: {item.location}</p>
              )}
              {item.contact && (
                <p className="text-sm text-gray-600 mb-1">Contact: {item.contact}</p>
              )}

              <button
                onClick={() => handleViewDetails(item._id)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                View Details
              </button>

              {item.timeAgo && (
                <p className="text-xs text-gray-500 mt-2">Posted: {item.timeAgo}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetProperty;

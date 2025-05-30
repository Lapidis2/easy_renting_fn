import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { NavBar } from "../components/NavBar";

const GetAssetPropertyByType = () => {
  const { type } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  useEffect(() => {
    const fetchAssets = async () => {
      setAssets([]);
      setError(null);
      setLoading(true);

      try {
        const res = await axios.get(
          `https://easy-renting-bn.onrender.com/api/property-asset/type/${displayType}`
        );
        setAssets(res.data || []);  
        console.log("asset by type",res.data); 
        console.log("asset by type",res.data.type);   
      } catch (err) {
        console.error(err);
        setError("Failed to fetch assets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (displayType) {
      fetchAssets();
    }
  }, [type]); // Depend on the route param

  const handleViewDetails = (id) => {
    navigate(`/asset/${id}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading {displayType} properties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {displayType} Listings
        </h2>

        {assets.length === 0 ? (
          <div className="text-center py-20 text-lg">
            No assets available for this type.
          </div>
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
                    alt={item.name || "Asset"}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  {item.status && (
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                      {item.status}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-blue-800 mb-1">
                  {item.name || "Unnamed"}
                </h3>
                {item.price && (
                  <p className="text-gray-700 font-medium mb-1">Price: {item.price}</p>
                )}
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
      <Footer />
    </>
  );
};

export default GetAssetPropertyByType;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Home/SearchBar";

const HeroSection = ({ onSearchResults }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results) => {
    setFilteredData(results);
    setHasSearched(true);
    onSearchResults(results); // Pass results to the parent component
  };

  return (
    <div className="relative h-auto py-12 px-4 sm:px-8 w-full bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/homeImage.jpg"
          alt="Find your dream home"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg leading-tight">
          Find the perfect place to <br />
          live with your family in Rwanda.
        </h1>

        {/* Search Bar */}
        <div className="mt-6">
          <SearchBar onResults={handleSearchResults} />
        </div>

        {/* Results List */}
        {filteredData.length > 0 && (
          <div className="mt-6 max-w-2xl mx-auto w-full bg-white rounded-xl shadow-lg text-gray-800 overflow-hidden">
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {filteredData.map((item) => (
                <Link
                  key={item._id || item.id}
                  to={`/property/${item._id}`}
                  className="block px-4 py-3 hover:bg-gray-100 transition duration-200"
                >
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {hasSearched && filteredData.length === 0 && (
          <div className="mt-6 bg-red-500/80 text-white px-6 py-4 rounded-md text-lg">
            No results found. Try a different keyword, location, or status.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

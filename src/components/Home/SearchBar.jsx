import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onResults = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [district, setDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('properties'); // Default category

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (category) queryParams.append('category', category);
      if (searchTerm) queryParams.append('search', searchTerm);
      if (status) queryParams.append('status', status);
      if (type) queryParams.append('type', type);
      if (district) queryParams.append('district', district);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const response = await axios.get(`https://easy-renting-bn.onrender.com/api/search?${queryParams.toString()}`);
      const results = response.data.data;

      onResults(results); // Safely call onResults
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex flex-col text-gray-600 sm:flex-row gap-2">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="properties">Properties</option>
          <option value="cars">Cars</option>
          <option value="clothes">Clothes</option>
          <option value="lands">Lands</option>
          <option value="supply">Supply</option>
          <option value="requests">Requests</option>
          <option value="motors">Motors</option>
        </select>

        {/* Search Term */}
        <input
          type="text"
          placeholder="Search by title, location, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full lg:w-1/3"
        />

        {/* District */}
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 rounded w-full lg:w-1/3"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="pending">Pending</option>
        </select>

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
          <option value="commercial">Commercial</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-full lg:w-1/3"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-full lg:w-1/3"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

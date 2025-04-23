import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "rent", label: "Rent" },
    { value: "buy", label: "Buy" },
  ];

  const categoryOptions = [
    { value: "cars", label: "Cars" },
    { value: "properties", label: "Properties (Apartment, House, Hotel)" },
    { value: "lands", label: "Land" },
    { value: "motors", label: "Motors" },
    { value: "supplys", label: "Supply Items" },
    { value: "requests", label: "Requests" },
    { value: "clothes", label: "Clothes" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!category && keyword.trim() === "" && district.trim() === "" && !minPrice && !maxPrice) {
        setFilteredResults([]);
        return;
      }

      setLoading(true);
      try {
        const queryParams = {
          category: category ? category.value : undefined,
          search: keyword.trim() || undefined,
          district: district.trim() || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          status: status ? status.value : undefined,
        };

        const query = new URLSearchParams(queryParams).toString();

        const response = await axios.get(
          `https://easy-renting-bn.onrender.com/api/search?${query}`
        );

        setFilteredResults(response.data.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [category, keyword, district, minPrice, maxPrice, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = {
      category: category ? category.value : "",
      search: keyword.trim(),
      district: district.trim(),
      minPrice,
      maxPrice,
      status: status ? status.value : "",
    };
    onSearch(queryParams);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white p-5 rounded-xl shadow-lg w-full"
      >
        {/* Keyword Input */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by title, location, type..."
          className="px-4 py-3 outline-none text-sm w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500"
        />

        {/* Status Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={statusOptions}
            value={statusOptions.find(
              (option) => option.value === (status ? status.value : "")
            )}
            onChange={setStatus}
            className="text-sm text-gray-800"
            classNamePrefix="react-select"
            placeholder="Select Status"
            isSearchable={false}
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={categoryOptions}
            value={categoryOptions.find(
              (option) => option.value === (category ? category.value : "")
            )}
            onChange={setCategory}
            className="text-sm text-gray-800"
            classNamePrefix="react-select"
            placeholder="Select Category"
            isSearchable={false}
          />
        </div>

        {/* District Input */}
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="Enter district"
          className="px-4 py-3 outline-none text-sm w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500"
        />

        {/* Min Price Input */}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          className="px-4 py-3 outline-none text-sm w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500"
        />

        {/* Max Price Input */}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="px-4 py-3 outline-none text-sm w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md w-full md:w-auto flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute bg-white text-gray-500 shadow-lg w-full mt-2 rounded-lg p-4">
          Loading...
        </div>
      )}

      {/* Results Dropdown */}
      {filteredResults.length > 0 && (
        <ul className="absolute bg-white text-gray-800 shadow-lg w-full mt-2 rounded-lg max-h-60 overflow-y-auto z-10">
          {filteredResults.map((item) => (
            <li
              key={item._id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              {item.title || item.name} - {item.type || item.category} - {item.location}
            </li>
          ))}
        </ul>
      )}

      {/* No Results Message */}
      {!loading && filteredResults.length === 0 && keyword.trim() !== "" && (
        <div className="absolute bg-white text-gray-500 shadow-lg w-full mt-2 rounded-lg p-4">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';
import axios from 'axios';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'Available',
    owner: '',
    contact: '',
    description: '',
    price: '',
    toilets: '',
    features: [],
  });
   const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key !== 'features') {
        data.append(key, formData[key]);
      }
    }
    formData.features.forEach(feature => data.append('features', feature));
    data.append('image', image);

    try {
      setLoading(true);
 await axios.post('https://easy-renting-bn.onrender.com/api/create-property',
        data
      );
      alert('Property added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add property.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Property</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>House</option>
          <option>Apartment</option>
          <option>Hotel</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="toilets"
          type="number"
          placeholder="Toilets"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="area"
          placeholder="Area (e.g. 250 spm)"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="status"
          required
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Available</option>
          <option>Rent</option>
          <option>Sale</option>
          <option>Pending</option>
        </select>

        <input
          name="owner"
          placeholder="Owner Name"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="contact"
          placeholder="Contact (e.g. 0788xxxxxx)"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleImageChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          required
          onChange={handleChange}
          className="md:col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Features Input */}
        <div className="md:col-span-2">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <button type='submit' disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {loading ? "Submitting..." : "Create Property"}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;

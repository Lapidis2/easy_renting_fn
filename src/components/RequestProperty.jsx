import React from 'react';
import { useState } from 'react';
import axios from "axios"; 
const RequestProperty = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    status: "",
    location: "",
    requesterName: "",
    contact: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    area: "",
    type: "",
    features: "",
    timeAgo: "",
    image: null,
  });  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
	e.preventDefault();
  
	try {
	  const data = new FormData();
	  Object.entries(formData).forEach(([key, value]) => {
		if (value) data.append(key, value);
	  });
  
	  const res = await axios.post("https://easy-renting-bn.onrender.com/api/request-property", data, {
		headers: {
		  "Content-Type": "multipart/form-data",
		},
	  });
  
	  console.log("Success:", res.data);
	  alert("Request submitted successfully!");
  
	  setFormData({
		id: "",
		title: "",
		price: "",
		status: "",
		location: "",
		requesterName: "",
		contact: "",
		description: "",
		bedrooms: "",
		bathrooms: "",
		toilets: "",
		area: "",
		type: "",
		features: "",
		timeAgo: "",
		image: null,
	  });
  
	} catch (error) {
	  console.error("Error submitting request:", error.response?.data || error.message);
	  alert("Something went wrong while submitting the request.");
	}
  };


  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">REQUEST PROPERTY</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Property Title" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="text" name="requesterName" placeholder="Your Name" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="text" name="location" placeholder="Preferred Location" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="tel" name="contact" className="w-full border p-2 rounded" placeholder="Contact Number" onChange={handleChange} />
          <select name="status" className="border p-2 rounded w-full" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="For Rent">For Rent</option>
            <option value="For Sale">For Sale</option>
          </select>
          <input type="number" name="price" className="border p-2 rounded w-full" placeholder="Budget Price" onChange={handleChange} />
          <input type="number" name="bedrooms" className="border p-2 rounded w-full" placeholder="Minimum Bedrooms" onChange={handleChange} />
          <input type="number" name="bathrooms" className="border p-2 rounded w-full" placeholder="Minimum Bathrooms" onChange={handleChange} />
          <input type="number" name="toilets" className="border p-2 rounded w-full" placeholder="Minimum Toilets" onChange={handleChange} />
          <input type="text" name="area" className="border p-2 rounded w-full" placeholder="Preferred Area (sqm)" onChange={handleChange} />
          <input type="text" name="type" className="border p-2 rounded w-full" placeholder="Property Type" onChange={handleChange} />
          <input type="text" name="features" className="border p-2 rounded w-full" placeholder="Desired Features (comma separated)" onChange={handleChange} />
        </div>
        <textarea name="description" placeholder="Additional Requirements" className="border p-2 rounded w-full" onChange={handleChange}></textarea>
        <input type="file"  accept="image/*" onChange={handleImageUpload}  name="image" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestProperty;


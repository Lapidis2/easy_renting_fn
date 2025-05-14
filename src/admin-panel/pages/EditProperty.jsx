import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "House",
    location: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    area: "",
    status: "Rent",
    owner: "",
    contact: "",
    image: "",
    description: "",
    price: "",
    features: [],
  });

  useEffect(() => {
    axiosClient.get(`/get-property/${id}`)
      .then(res => setFormData(res.data.property))
      .catch(err => console.error("Error fetching property:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "features") {
      setFormData(prev => ({
        ...prev,
        features: value.split(",").map(f => f.trim())
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/update-property/${id}`, formData);
      alert("Property updated successfully!");
      navigate("/admin-panel"); // or wherever you want
    } catch (err) {
      console.error("Error updating property:", err);
      alert("Failed to update property.");
    }
  };

  return (
    <MainLayout>
       <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>Update Property</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {[
          { label: "Title", name: "title" },
          { label: "Location", name: "location" },
          { label: "Bedrooms", name: "bedrooms", type: "number" },
          { label: "Bathrooms", name: "bathrooms", type: "number" },
          { label: "Toilets", name: "toilets", type: "number" },
          { label: "Area", name: "area" },
          { label: "Owner", name: "owner" },
          { label: "Contact", name: "contact" },
          { label: "Image URL", name: "image" },
          { label: "Description", name: "description" },
          { label: "Price", name: "price" },
          { label: "Features (comma separated)", name: "features" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label style={{ fontWeight: "500" }}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.375rem",
                marginTop: "0.25rem"
              }}
            />
          </div>
        ))}

        {/* Dropdowns */}
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem" }}
          >
            <option value="Available">Available</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem" }}
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Hotel">Hotel</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Update Property
        </button>
      </form>
    </div>
    </MainLayout>
    
  );
};

export default UpdateProperty;

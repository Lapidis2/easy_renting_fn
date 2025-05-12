import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    location: '',
    image: null,
    description: '',
    price: '',
    owner: '',
    contact: '',
    bedrooms: '',
    bathrooms: '',
    toilets: '',
    area: '',
    type: '',
    features: '',
    existingImage: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/get-property/${id}`);
        const {
          title,
          status,
          location,
          description,
          price,
          owner,
          contact,
          bedrooms,
          bathrooms,
          toilets,
          area,
          type,
          features,
          imageUrl
        } = res.data.property;
        console.log('Fetched property:', res.data.property);
        setFormData({
          title,
          status,
          location,
          image: null,
          description,
          price,
          owner,
          contact,
          bedrooms,
          bathrooms,
          toilets,
          area,
          type,
          features: features.join(', '),
          existingImage: imageUrl || ''
        });
        setPreviewImage(imageUrl || null);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'features') {
        updatedData.append(key, JSON.stringify(formData.features.split(',').map(f => f.trim())));
      } else if (key === 'image' && formData[key]) {
        updatedData.append(key, formData[key]);
      } else if (key !== 'existingImage') {
        updatedData.append(key, formData[key]);
      }
    });

    try {
      await axios.put(`/update-property/${id}`, updatedData);
      navigate('/admin-panel');
    } catch (error) {
      console.error('Failed to update property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <MainLayout>
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'status', 'location', 'price', 'owner', 'contact', 'bedrooms', 'bathrooms', 'toilets', 'area', 'type'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={['price', 'bedrooms', 'bathrooms', 'toilets'].includes(field) ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-full h-64 object-cover rounded-md"
            />
          )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
   </MainLayout>
  );
};

export default EditProperty;

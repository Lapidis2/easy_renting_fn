import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const AdminAssetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: 'Car',
    status: 'Available',
    owner: '',
    contact: '',
    location: '',
    transmission: '',
    fuel: '',
    certified: false,
    inspected: false,
    warranty: '',
    rentalPrice: '',
    rentDuration: '',
    size: '',
    condition: 'New',
    sizeCloth: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(`/property-asset/${id}`);
        const asset = res.data;
        setFormData({
          name: asset.name || '',
          price: asset.price || '',
          type: asset.type || 'Car',
          status: asset.status || 'Available',
          owner: asset.owner || '',
          contact: asset.contact || '',
          location: asset.location || '',
          transmission: asset.transmission || '',
          fuel: asset.fuel || '',
          certified: asset.certified || false,
          inspected: asset.inspected || false,
          warranty: asset.warranty || '',
          rentalPrice: asset.rentalPrice || '',
          rentDuration: asset.rentDuration || '',
          size: asset.size || '',
          condition: asset.condition || 'New',
          sizeCloth: asset.sizeCloth || '',
          description: asset.description || ''
        });
        setPreview(asset.image || null);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        setError('Failed to load asset data.');
      }
    };
    fetchAsset();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (typeof val === 'boolean' || val.toString().trim() !== '') {
        data.append(key, val);
      }
    });
    if (image) {
      data.append('image', image);
    }

    try {
      const res = await axios.put(`/property-asset/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin-panel/asset-property');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-semibold mb-6">Edit Asset</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Land</option>
                <option>Clothes</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Available</option>
                <option>Rent</option>
                <option>Sale</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Owner</label>
              <input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Contact</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="block"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-48 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AdminAssetEdit;

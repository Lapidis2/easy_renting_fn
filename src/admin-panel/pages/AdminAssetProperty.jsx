import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const AdminAssetProperty = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/property-asset'); // adjust endpoint
      setAssets(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleView = (id) => {
    navigate(`/admin-panel/asset-property/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/update-asset-property/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await axios.delete(`/property-asset/${id}`);
      fetchAssets();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <div className="text-center p-4">Loading assets...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Asset Management</h1>
        {assets.length === 0 ? (
          <p className="text-gray-500">No assets available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map(asset => (
              <div key={asset._id} className="bg-white shadow rounded p-4">
                <img
                  src={asset.image}
                  alt={asset.name || asset.type}
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h2 className="font-semibold text-lg mb-2">{asset.name || 'Unnamed'}</h2>
                <p className="text-gray-600">Type: {asset.type}</p>
                <p className="text-gray-600">Status: {asset.status}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleView(asset._id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(asset._id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminAssetProperty;

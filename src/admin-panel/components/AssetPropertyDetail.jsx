import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';
import { useParams } from 'react-router-dom';
import MainLayout from './MainLayout';

// Reusable detail row
const DetailRow = ({ label, value }) => {
  if (!value && typeof value !== 'boolean') return null;
  return (
    <p className="mb-1">
      <span className="font-semibold">{label}:</span>{' '}
      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
    </p>
  );
};

// Main component
const AdminAssetDetail = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(`/property-asset/${id}`);
        setAsset(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load asset');
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!asset) return <div className="p-4">Asset not found.</div>;

  const assetType = asset?.type ? asset.type.charAt(0).toUpperCase() + asset.type.slice(1) : '';

  // Type helpers
  const isCloth = ['Cloth', 'Clothing', 'Clothes'].includes(assetType);
  const isVehicle = ['Vehicle', 'Car', 'Truck', 'Van'].includes(assetType);
  const isMotorcycle = ['Motorcycle', 'Bike', 'Motorbike'].includes(assetType);
  const isLand = ['Land', 'Plot', 'Property'].includes(assetType);
  const isOther = ['Other', 'Miscellaneous', 'Misc'].includes(assetType);
  console.log('Asset Type:', assetType);
  console.log('Asset:', asset);
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">{asset.name || asset.type}</h1>

        {asset.image && (
          <img
            src={asset.image}
            alt={asset.name || 'Asset Image'}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <div className="space-y-4">
          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
            <DetailRow label="Type" value={asset.type} />
            <DetailRow label="Status" value={asset.status} />
            <DetailRow label="Price" value={asset.price} />
            <DetailRow label="Condition" value={asset.condition} />
            <DetailRow label="Description" value={asset.description} />
          </section>

          {/* Ownership & Contact */}
          <section>
            <h2 className="text-lg font-semibold mt-4 mb-2">Ownership & Contact</h2>
            <DetailRow label="Owner" value={asset.owner} />
            <DetailRow label="Contact" value={asset.contact} />
            <DetailRow label="Location" value={asset.location} />
          </section>

          {/* Vehicle Info */}
          {(isVehicle || isMotorcycle) && (
            <section>
              <h2 className="text-lg font-semibold mt-4 mb-2">Vehicle Info</h2>
              <DetailRow label="Transmission" value={asset.transmission} />
              <DetailRow label="Fuel" value={asset.fuel} />
              <DetailRow label="Certified" value={asset.certified} />
              <DetailRow label="Inspected" value={asset.inspected} />
              <DetailRow label="Warranty" value={asset.warranty} />
            </section>
          )}

          {(isVehicle || isLand) && (
            <section>
              <h2 className="text-lg font-semibold mt-4 mb-2">Rental Info</h2>
              <DetailRow label="Rental Price" value={asset.rentalPrice} />
              <DetailRow label="Rent Duration" value={asset.rentDuration} />
            </section>
          )}


          {/* Other Info */}
          <section>
            <h2 className="text-lg font-semibold mt-4 mb-2">Other Info</h2>
            {isLand && <DetailRow label="Size" value={asset.size} />}
            {isCloth && <DetailRow label="Cloth Size" value={asset.sizeCloth} />}
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminAssetDetail;

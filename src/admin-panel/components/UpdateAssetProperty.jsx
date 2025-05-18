import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const AdminAssetEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        type: 'Car',
        status: 'Available',
        price: '',
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
                const data = res.data;
                setFormData({
                    name: data.name || '',
                    type: data.type || 'Car',
                    status: data.status || 'Available',
                    price: data.price || '',
                    owner: data.owner || '',
                    contact: data.contact || '',
                    location: data.location || '',
                    transmission: data.transmission || '',
                    fuel: data.fuel || '',
                    certified: data.certified || false,
                    inspected: data.inspected || false,
                    warranty: data.warranty || '',
                    rentalPrice: data.rentalPrice || '',
                    rentDuration: data.rentDuration || '',
                    size: data.size || '',
                    condition: data.condition || 'New',
                    sizeCloth: data.sizeCloth || '',
                    description: data.description || ''
                });
                setPreview(data.image || null);
            } catch (err) {
                console.error(err);
                setError('Failed to load asset data');
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
            data.append(key, val);
        });
        if (image) data.append('image', image);

        try {
            await axios.put(`/property-asset/${id}`, data);
            navigate('/admin-panel/asset-property');
        } catch (err) {
            console.error(err);
            setError('Update failed. Please try again.');
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
                        <label>Name</label>
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
                            <label>Type</label>
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
                            <label>Status</label>
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
                        <label>Price</label>
                        <input
                            name="price"
                            type="text"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Owner</label>
                            <input
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label>Contact</label>
                            <input
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Transmission</label>
                            <select
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">-</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <label>Fuel</label>
                            <select
                                name="fuel"
                                value={formData.fuel}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">-</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="certified"
                                checked={formData.certified}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Certified
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="inspected"
                                checked={formData.inspected}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Inspected
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Warranty</label>
                            <input
                                name="warranty"
                                value={formData.warranty}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label>Rental Price</label>
                            <input
                                name="rentalPrice"
                                value={formData.rentalPrice}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Rent Duration</label>
                            <input
                                name="rentDuration"
                                value={formData.rentDuration}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label>Size</label>
                            <input
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Condition</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                        <div>
                            <label>Cloth Size</label>
                            <input
                                name="sizeCloth"
                                value={formData.sizeCloth}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
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

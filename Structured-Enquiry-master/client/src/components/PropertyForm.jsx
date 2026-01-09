import { useState, useEffect } from 'react';

const PropertyForm = ({ currentProperty, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        price: '',
        type: 'Rent',
        bedrooms: '',
        bathrooms: '',
        size: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (currentProperty) {
            setFormData(currentProperty);
        }
    }, [currentProperty]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="property-form">
            <h3>{currentProperty ? 'Edit Property' : 'Add New Property'}</h3>
            <div className="form-group">
                <label>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-grid">
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Bedrooms</label>
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Bathrooms</label>
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Size (sq ft)</label>
                    <input type="number" name="size" value={formData.size} onChange={handleChange} required />
                </div>
            </div>
            <div className="form-group">
                <label>Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn">Save Property</button>
                <button type="button" onClick={onCancel} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Cancel</button>
            </div>
        </form>
    );
};

export default PropertyForm;

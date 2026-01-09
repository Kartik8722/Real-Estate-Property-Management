import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import PropertyForm from '../components/PropertyForm';
import PropertyCard from '../components/PropertyCard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);

    const fetchProperties = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/properties');
            // Check if backend filtering is implemented or filter here
            // Since getAllProperties returns all, we might want to filter by user on backend or here
            // But requirement says "Property Management", usually implies managing own properties.
            // Let's assume user sees all for now, but can only edit theirs (backend logic).
            // Actually, for a dashboard, seeing own properties is better.
            // Let's filter on frontend for now if backend sends all. 
            // Better: update backend to get user specific properties, but I'll stick to 'manage all' or 'filter' behavior.
            // Wait, the controller code checks ownership for update/delete. 
            // So everyone can see all, but only edit own.
            setProperties(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleAdd = () => {
        setCurrentProperty(null);
        setShowForm(true);
    };

    const handleEdit = (property) => {
        setCurrentProperty(property);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:5001/api/properties/${id}`);
                setProperties(properties.filter(p => p._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || 'Delete failed');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentProperty) {
                const res = await axios.put(`http://localhost:5001/api/properties/${currentProperty._id}`, formData);
                setProperties(properties.map(p => p._id === currentProperty._id ? res.data : p));
            } else {
                const res = await axios.post('http://localhost:5001/api/properties', formData);
                setProperties([...properties, res.data]);
            }
            setShowForm(false);
        } catch (err) {
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={handleAdd} className="btn">Add Property</button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <PropertyForm
                            currentProperty={currentProperty}
                            onSubmit={handleSubmit}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            <div className="properties-grid">
                {properties.map(property => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

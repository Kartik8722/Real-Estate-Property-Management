const PropertyCard = ({ property, onEdit, onDelete }) => {
    return (
        <div className="property-card">
            {property.imageUrl && <img src={property.imageUrl} alt={property.title} className="property-img" />}
            <div className="property-info">
                <h3>{property.title}</h3>
                <p className="price">${property.price.toLocaleString()} / {property.type === 'Rent' ? 'mo' : ''}</p>
                <p className="address">{property.address}</p>
                <div className="specs">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.size} sq ft</span>
                </div>
                <div className="actions">
                    <button onClick={() => onEdit(property)} className="btn-sm">Edit</button>
                    <button onClick={() => onDelete(property._id)} className="btn-sm btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

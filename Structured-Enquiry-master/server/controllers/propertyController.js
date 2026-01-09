const Property = require('../models/Property');

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('user', 'username email');
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProperty = async (req, res) => {
    try {
        const newProperty = new Property({ ...req.body, user: req.user.id });
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('user', 'username email');
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        if (property.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        if (property.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Use deleteOne() instead of remove() as remove is deprecated
        await Property.deleteOne({ _id: req.params.id });
        res.json({ message: 'Property removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

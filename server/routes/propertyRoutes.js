const express = require('express');
const router = express.Router();
const { getAllProperties, createProperty, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllProperties);
router.post('/', auth, createProperty);
router.get('/:id', getPropertyById);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;

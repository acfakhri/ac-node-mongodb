// routes.js
const express = require('express');
const router = express.Router();
const UserModels = require('./models');

// CREATE
router.post('/users', async (req, res) => {
    try {
        const result = await UserModels.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ
router.get('/users', async (req, res) => {
    try {
        const result = await UserModels.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
    try {
        const result = await UserModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await UserModels.findByIdAndDelete(id);
        res.json("Data telah dihapus dengan id", result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

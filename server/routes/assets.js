const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// GET all assets
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll({ order: [['createdAt', 'DESC']] });
        res.json(assets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new asset
router.post('/', async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.status(201).json(newAsset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE asset
router.delete('/:id', async (req, res) => {
    try {
        const result = await Asset.destroy({ where: { id: req.params.id } });
        if (result === 0) return res.status(404).json({ error: 'Asset not found' });
        res.json({ message: 'Asset deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Asset.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAsset = await Asset.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedAsset);
        } else {
            res.status(404).json({ error: 'Asset not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
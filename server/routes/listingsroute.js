import express from 'express';
import Listing from '../models/Listing.js';

const router = express.Router();

// ✅ CREATE a new listing
router.post('/add', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    const saved = await listing.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ READ all listings
router.get('/get', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET all listings for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.params.userId });
    res.json(listings);
  } catch (err) {
    console.error('Error fetching user listings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ UPDATE a listing
// UPDATE a listing by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a listing by ID
router.delete('/del/:id', async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;

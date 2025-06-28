const express = require('express');
const router = express.Router();
const db = require('../models/db'); // adjust if your DB file is elsewhere

// GET all holidays from holiday_days_list table
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM HOLIDAY_DAYS_LIST');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching holidays:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

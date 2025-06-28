const express = require('express');
const router = express.Router();
const db = require('../models/db'); // uses mysql2/promise

// POST: Insert a special user holiday
router.post('/', async (req, res) => {
  const {
    HOLIDAY_NAME,
    DATE,
    USERID,
    FIRMID,
    STATUS = 'ACTIVE',
    Type = '',
    Country = ''
  } = req.body;

  if (!HOLIDAY_NAME || !DATE || !USERID || !FIRMID) {
    return res.status(400).json({
      error: 'Missing required fields: HOLIDAY_NAME, DATE, USERID, or FIRMID',
    });
  }

  const query = `
    INSERT INTO SPECIAL_USER_HOLIDAY
    (HOLIDAY_NAME, DATE, USERID, FIRMID, STATUS, TYPE, COUNTRY)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(query, [HOLIDAY_NAME, DATE, USERID, FIRMID, STATUS, Type, Country]);
    res.status(201).json({
      message: 'Special user holiday added',
      insertedId: result.insertId,
    });
  } catch (err) {
    console.error('❌ Failed to insert special user holiday:', err.message);
    res.status(500).json({ error: 'Insert failed' });
  }
});

// GET: Get all special user holidays
router.get('/', async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM SPECIAL_USER_HOLIDAY ORDER BY DATE DESC');
    res.json(results);
  } catch (err) {
    console.error('❌ Failed to fetch special user holidays:', err.message);
    res.status(500).json({ error: 'Failed to fetch special user holidays' });
  }
});

module.exports = router;

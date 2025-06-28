// routes/externalHolidays.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = process.env.CALENDARIFIC_KEY;

// GET /api/external-holidays?country=US&year=2025
router.get('/', async (req, res) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res.status(400).json({ error: 'country and year are required' });
  }

  try {
    const response = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: apiKey,
        country,
        year
      }
    });

    const holidays = response.data?.response?.holidays || [];

    const formatted = holidays.map(h => ({
      HOLIDAY_NAME: h.name,
      DATE: h.date.iso,
      description: h.description,
      TYPE: h.type.join(', '),
      CATEGORY: country.toUpperCase()
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching from Calendarific:", error.message);
    res.status(500).json({ error: 'Failed to fetch external holidays' });
  }
});

module.exports = router;

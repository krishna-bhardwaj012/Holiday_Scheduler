// routes/externalHolidays.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get API Key from .env
const apiKey = process.env.CALENDARIFIC_KEY;

// @route   GET /api/external_holidays?country=IN&year=2025
// @desc    Fetch holidays from Calendarific API for given country and year
router.get('/', async (req, res) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res.status(400).json({ error: 'Both "country" and "year" query parameters are required.' });
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

    // Format holidays data
    const formatted = holidays.map(h => ({
      HOLIDAY_NAME: h.name,
      DATE: h.date.iso,
      description: h.description,
      TYPE: h.type.join(', '),
      CATEGORY: country.toUpperCase()
    }));

    res.json(formatted);
  } catch (error) {
    console.error("❌ Calendarific API error:", error.message);
    res.status(500).json({ error: 'Failed to fetch external holidays. Please try again later.' });
  }
});

module.exports = router;

// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Route files
const holidayRoutes = require('./routes/holidayRoutes');
const specialHolidayRouter = require('./routes/specialHolidayRouter');
const externalHolidayRouter = require('./routes/externalHolidays');

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/holiday_days_list', holidayRoutes);
app.use('/api/special_user_holiday', specialHolidayRouter);
app.use('/api/external_holidays', externalHolidayRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('🎉 Holiday Scheduler API is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

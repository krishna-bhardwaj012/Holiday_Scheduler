// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Route files
const holidayRoutes = require('./routes/holidayRoutes');
const specialHolidayRouter = require('./routes/specialHolidayRouter');
const externalHolidayRouter = require('./routes/externalHolidays'); // NEW

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/holiday_days_list', holidayRoutes);
app.use('/api/special_user_holiday', specialHolidayRouter);
app.use('/api/external-holidays', externalHolidayRouter); // Calendarific API route

// Root route
app.get("/", (req, res) => {
  res.send("🎉 Holiday Scheduler API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

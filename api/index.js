const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../server/config/db');
const weatherRoutes = require('../server/routes/weather');
const errorHandler = require('../server/middleware/errorHandler');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/weather', weatherRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Weather API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// Export for Vercel serverless
module.exports = app;

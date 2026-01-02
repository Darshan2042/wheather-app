# 🌤️ Premium Weather Web Application - MERN Stack

A modern, production-ready weather application with a stunning purple gradient UI, glassmorphism effects, and smooth animations.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

---

## ✨ Features

- 🎨 **Modern Premium UI** - Purple/violet gradient theme with glassmorphism
- 🌍 **Multiple Cities** - Track weather in multiple locations simultaneously
- 🔄 **Real-time Data** - Live weather updates from OpenWeatherMap API
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile
- 🎭 **Smooth Animations** - Hover effects, transitions, and card animations
- 🔍 **City Search** - Easily search and add new cities
- 💾 **MongoDB Storage** - Save your favorite cities
- ⏰ **Live Clock** - Real-time date and time display
- 🎯 **3D Weather Icons** - Beautiful, soft 3D-style weather icons

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library with functional components and hooks
- **CSS3** - Modern styling with gradients and animations
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation middleware

### Database
- **MongoDB** - NoSQL database for storing cities

### External API
- **OpenWeatherMap API** - Weather data provider

---

## 📁 Project Structure

```
weather-app-mern/
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # Date/time display
│   │   │   ├── WeatherCard.jsx  # Individual city card
│   │   │   ├── CityCarousel.jsx # Scrollable cards container
│   │   │   └── SearchBar.jsx    # City search input
│   │   ├── services/
│   │   │   └── api.js           # API communication
│   │   ├── utils/
│   │   │   └── weatherIcons.js  # Weather icon mappings
│   │   ├── styles/
│   │   │   └── App.css          # Global styles
│   │   ├── App.jsx              # Main component
│   │   └── index.js             # Entry point
│   └── package.json
├── server/                      # Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/
│   │   └── City.js              # City schema
│   ├── routes/
│   │   └── weather.js           # Weather API routes
│   ├── controllers/
│   │   └── weatherController.js # Request handlers
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling
│   └── server.js                # Server entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json                 # Root dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd weather-app-mern
```

### Step 2: Install Dependencies

Install both backend and frontend dependencies:

```bash
npm run install-all
```

Or install them separately:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API keys" section
4. Copy your API key

### Step 4: Configure Environment Variables

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Edit `.env` and add your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_actual_api_key_here
CLIENT_URL=http://localhost:3000
```

### Step 5: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 6: Run the Application

**Development Mode** (recommended):
```bash
npm run dev
```
This will start both backend (port 5000) and frontend (port 3000) concurrently.

**Or run separately:**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📖 Usage Guide

### Adding Cities

1. **Type city name** in the search bar at the top
2. **Press Enter** or click the search button
3. The city will be added to your carousel
4. Weather data is automatically fetched and saved

### Viewing Weather

- **Scroll horizontally** through the city cards
- Each card displays:
  - City name and country
  - Current temperature
  - Weather condition (Sunny, Cloudy, Rainy, etc.)
  - High and Low temperatures
  - Beautiful 3D weather icon

### Removing Cities

- **Click the remove button** (×) on any city card
- The city will be deleted from the carousel and database

### Hover Effects

- **Hover over cards** to see smooth lift and scale animations
- Cards use glassmorphism with shadows and transparency

---

## 🔌 API Endpoints

### Weather Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather` | Get all saved cities with weather |
| GET | `/api/weather/:city` | Get weather for a specific city |
| POST | `/api/weather` | Add a new city |
| DELETE | `/api/weather/:id` | Remove a city by ID |

### Example Requests

**Add a City:**
```bash
POST http://localhost:5000/api/weather
Content-Type: application/json

{
  "cityName": "London"
}
```

**Get All Cities:**
```bash
GET http://localhost:5000/api/weather
```

**Delete a City:**
```bash
DELETE http://localhost:5000/api/weather/64abc123def456789
```

---

## 🎨 Customization

### Changing the Color Theme

Edit `client/src/styles/App.css`:

```css
/* Change gradient colors */
.app {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}

/* Change card colors */
.weather-card {
  background: rgba(your-rgb, 0.15);
}
```

### Adding More Weather Icons

Edit `client/src/utils/weatherIcons.js`:

```javascript
export const getWeatherIcon = (condition) => {
  const icons = {
    'YourCondition': '🌈',
    // Add more mappings
  };
  return icons[condition] || '🌍';
};
```

### Modifying Animation Speed

Edit `client/src/styles/App.css`:

```css
.weather-card {
  transition: transform 0.3s ease; /* Change duration */
}
```

---

## 🏗️ Architecture Overview

### Frontend Flow
```
User Input → SearchBar → API Call → State Update → WeatherCard Render
```

### Backend Flow
```
HTTP Request → Express Router → Controller → MongoDB/Weather API → Response
```

### Data Flow
```
OpenWeatherMap API → Backend → MongoDB → Frontend → User Interface
```

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Environment variables for sensitive data
- CORS configuration
- Input validation with express-validator
- Error handling middleware
- MongoDB injection prevention (Mongoose)

🔐 **Production Recommendations:**
- Add rate limiting (express-rate-limit)
- Implement authentication (JWT)
- Use HTTPS
- Add request sanitization
- Set up monitoring and logging

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Check MongoDB status
systemctl status mongod  # Linux
brew services list        # macOS
```

### API Key Error
```
Error: Invalid API key
```
**Solution:** Verify your OpenWeatherMap API key in `.env` file

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change the port in `.env` or kill the process:
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux
```

### CORS Error
```
Access to fetch blocked by CORS policy
```
**Solution:** Verify `CLIENT_URL` in `.env` matches your frontend URL

---

## 📦 Building for Production

### Frontend Build

```bash
cd client
npm run build
```

This creates an optimized production build in `client/build/`.

### Deployment

**Backend:**
- Deploy to Heroku, AWS, DigitalOcean, or Render
- Set environment variables on the platform
- Use MongoDB Atlas for cloud database

**Frontend:**
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API endpoint to production backend URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **MongoDB** for database solution
- **React** community for excellent documentation
- **Express** for the robust backend framework

---

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the OpenWeatherMap API documentation

---

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Weather forecast (5-day, hourly)
- [ ] Weather alerts and notifications
- [ ] Dark/Light theme toggle
- [ ] Weather maps and radar
- [ ] Temperature unit conversion (°C/°F)
- [ ] Favorite cities feature
- [ ] Weather history and analytics
- [ ] PWA support for offline functionality
- [ ] Multi-language support

---

**Built with ❤️ using the MERN Stack**

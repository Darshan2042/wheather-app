# 🌦️ Weather App

## 📌 Description
Weather App is a modern, full-stack web application built using the **MERN stack** that provides real-time weather information for multiple cities around the world.  
The application features a clean and visually appealing UI with glassmorphism cards, gradient backgrounds, smooth hover animations, and a live date & time display.

It fetches live weather data from the **OpenWeatherMap API** and stores user-selected cities in **MongoDB**, allowing users to track weather conditions easily and efficiently.

---

## ✨ Features
- 🌍 Real-time weather information (temperature, humidity, weather condition)
- 🏙️ Add and track multiple cities
- 🎨 Modern UI with gradient background and glassmorphism cards
- 🧊 Smooth hover animations and transitions
- 📱 Fully responsive design for all devices
- ⏰ Live date and time display
- 🔍 Smart and fast city search
- 💾 Persistent data storage using MongoDB
- ❌ Easy add/remove city functionality

---

## 🛠️ Technology Used
- **React.js** – Frontend user interface
- **Node.js** – Backend runtime environment
- **Express.js** – RESTful API framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **Axios** – HTTP client for API calls
- **OpenWeatherMap API** – Live weather data
- **CSS3** – Styling, animations, and UI effects
- **dotenv** – Environment variable management
- **Nodemon** – Backend auto-restart during development
- **Concurrently** – Run frontend and backend together

---

## ⚙️ Installation
Follow these steps to set up and run the project locally:

 Step 1: Clone the Repository

git clone https://github.com/Darshan2042/Wheather-app.git
cd Wheather-app

---

Step 2: Install Dependencies

npm run install-all

---

Step 3: Configure environment variables

- port=5000
- node_env=development
- mongodb_uri=your_mongodb_connection_string
- openweather_api_key=your_openweathermap_api_key
- client_url=http://localhost:3000

---

step 4: Run the application
npm run dev

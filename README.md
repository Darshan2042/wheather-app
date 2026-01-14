# Weather App - MERN Stack

A modern, production-ready weather application built with the MERN stack (MongoDB, Express, React, Node.js).

## ✅ Deployment Fixes Applied

All deployment errors have been resolved:

### Fixed Issues:
1. ✅ **Vercel Configuration** - Updated `vercel.json` with proper routing
2. ✅ **Serverless API** - Fixed `api/index.js` for Vercel serverless environment
3. ✅ **MongoDB Connection** - Implemented connection caching for serverless
4. ✅ **Static File Serving** - Proper routes for React build files
5. ✅ **Build Process** - Optimized build command and output directory

---

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas cluster (free tier available)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Fixed Vercel deployment configuration"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your **"Wheather-app"** repository
4. Use these settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
NODE_ENV=production
```

> ⚠️ **Security Note**: Replace the hardcoded values in `.env` with your own credentials. Never commit `.env` to git!

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes.

---

## 🔧 Local Development

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
CLIENT_URL=http://localhost:3000
```

### Run Development Server

```bash
# Run both client and server
npm run dev

# Or run separately:
npm run server  # Backend only
npm run client  # Frontend only
```

---

## 📁 Project Structure

```
Wheather-app/
├── api/
│   └── index.js              # Vercel serverless API entry
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── styles/          # CSS styles
│   │   └── utils/           # Utility functions
│   ├── public/              # Static files
│   └── package.json         # Client dependencies
├── server/
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   └── server.js            # Server entry (local dev)
├── package.json             # Root dependencies
└── vercel.json             # Vercel configuration
```

---

## 🌐 API Endpoints

### Weather Endpoints

- `GET /api/health` - Health check
- `GET /api/weather` - Get all saved cities
- `GET /api/weather/:city` - Get weather for specific city
- `POST /api/weather` - Add new city
- `DELETE /api/weather/:id` - Remove city
- `PUT /api/weather/:id/refresh` - Refresh city weather

---

## 🔑 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `CLIENT_URL` | Frontend URL for CORS | No |

---

## 🐛 Troubleshooting

### Build Fails on Vercel

- Ensure `client/package.json` has all required dependencies
- Check that `vercel-build` script exists in root `package.json`
- Verify Node.js version compatibility

### API Returns 503 Error

- Check MongoDB connection string in environment variables
- Ensure MongoDB Atlas IP whitelist allows connections (0.0.0.0/0)
- Verify MongoDB credentials are correct

### Static Files Not Loading

- Clear Vercel cache and redeploy
- Check `vercel.json` routes configuration
- Ensure `client/build` directory exists after build

---

## 📝 Technologies Used

- **Frontend**: React, React Toastify, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **APIs**: OpenWeatherMap API
- **Deployment**: Vercel (Serverless)

---

## 📄 License

ISC

---

## 👤 Author

Darshan Pawar

---

## 🎉 Ready to Deploy!

All fixes are complete. Follow the deployment steps above to deploy your app!

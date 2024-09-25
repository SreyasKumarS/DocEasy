import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import the MongoDB connection

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => res.send('server is ready'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server Started listening on port ${PORT}`));

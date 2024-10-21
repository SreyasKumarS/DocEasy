import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import connectDB (default export)
import patientRoutes from './routes/patientRoutes.js'; // Include .js for ES modules
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();

// Connect to MongoDB
connectDB(); // Connect to the database after loading env variables

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Use patient routes for handling patient-related API endpoints
app.use('/api/patients', patientRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


// Start the server and listen on a specified port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

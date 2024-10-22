import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import patientRoutes from './routes/patientRoutes.js'; 
import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import { fileURLToPath } from 'url';
import path from 'path'

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname( __filename);

const app = express();


connectDB(); 

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Use patient routes for handling patient-related API endpoints
app.use('/api/patients', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);



app.use(express.static(path.join(_dirname, 'public')));


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

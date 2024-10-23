import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import patientRoutes from './routes/patientRoutes.js'; 
import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

connectDB(); 

// app.use(cors({
//   origin: 'http://localhost:5173', // replace with your frontend URL
//   credentials: true,
// }));


const allowedOrigins = ['http://localhost:5178'];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies to be sent and received
};


app.use(cors(corsOptions));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: true }))

app.use('/api/patients', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


app.get('/', (req, res) => {
  res.send('Server is ready');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

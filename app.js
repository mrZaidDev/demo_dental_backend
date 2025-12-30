import express from "express";
import connectDB from "./config/DBConnection.js";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js'
import cors from "cors";
import dentalManagementRoutes from './routes/dentalManagementRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser())


// Routes
app.use('/api/dental', dentalManagementRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});

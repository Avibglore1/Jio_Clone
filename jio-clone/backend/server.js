import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";
import PaymentRouter from "./routes/paymentRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import VideoRouter from "./routes/videoRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);
app.use(express.json());


// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", UserRouter);
app.use("/api/video", VideoRouter);
app.use("/api/payment", PaymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import cors from "cors";
import listingRoutes from "./routes/listingsroute.js"
import authRoutes from "./routes/auth.js"; 

dotenv.config();

const app = express();

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", authRoutes);

app.use("/api/listing",listingRoutes)

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

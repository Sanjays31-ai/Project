import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tour.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = process.env.port || 8000;
const corsOptions = {
    origin: true,
    Credentials: true,
};

app.use(
    cors({
        origin: ["http://localhost:3000", "https://ethnus-mern-project-2ab9.onrender.com:8000"], // Allow requests from this origin
        credentials: true, // Allow cookies to be sent with the request
    })
);

// for testing
app.get("/", (req, res) => {
    res.send("api is working");
});



// database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection Failed");
    }
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
    connect();
    console.log("Server Listening on port", port);
});

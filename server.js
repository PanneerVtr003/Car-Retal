import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    pickupDate: String,
    returnDate: String,
    location: String,
    requests: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// API: Create booking
app.post("/api/bookings", async (req, res) => {
    try {
        console.log("Incoming booking:", req.body);
        const booking = new Booking(req.body);
        await booking.save();

        // Simulate email (won't fail the booking)
        console.log(`✅ Booking confirmed for ${booking.email}`);

        res.status(201).json({ message: "✅ Booking saved successfully!" });
    } catch (err) {
        console.error("Booking failed:", err);
        res.status(500).json({ error: "Booking failed" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

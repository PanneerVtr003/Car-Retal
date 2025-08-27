import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pickupDate: String,
  returnDate: String,
  location: String,
  requests: String,
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);

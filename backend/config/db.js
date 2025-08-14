const mongoose = require("mongoose");
const connectDB = async () => {
try {
const mongoURI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
await mongoose.connect(mongoURI);
console.log("MongoDB connected successfully");
} catch (error) {
console.error("MongoDB connection failed:", error.message);
process.exit(1);
}
};
module.exports = connectDB;
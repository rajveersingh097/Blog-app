// seeder/adminSeeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../model/Admin");
dotenv.config();
mongoose
.connect(process.env.MONGO_URI_DEV)
.then(async () => {
await Admin.deleteMany();
const admin = new Admin({
name: "Admin",
email: "admin@gmail.com",
password: "123456", // This will be hashed by pre-save hook
});
await admin.save();
console.log("✅ Admin added successfully");
process.exit();
})
.catch((err) => {
console.error("❌ Seeding error:", err);
process.exit(1);
});
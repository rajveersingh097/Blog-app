const express = require("express"); 
const dotenv = require("dotenv"); 
const cors = require("cors"); 
const connectDB = require("./config/db"); 
const blogRoutes = require("./routes/blogRoutes"); 
const adminRoutes = require("./routes/adminRoutes"); 
 
dotenv.config(); 
const app = express(); 
 
// Middleware 
app.use( 
  cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  }) 
); 
app.use(express.json()); 
 
// Routes 
app.use("/api/blogs", blogRoutes); 
app.use("/api/admin", adminRoutes); 
 
// Connect DB and Start Server 
connectDB().then(() => { 
  const PORT = process.env.PORT || 5000; 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
});
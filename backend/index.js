const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");


dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(cors()); //allow request from frontend 
app.use(express.json({ limit: "10mb" })); //parse JSON body

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to DevConnect API!");
});

app.use("/api/form", formRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

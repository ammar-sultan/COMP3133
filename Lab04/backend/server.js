require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/routesUser");

const app = express();
const PORT = process.env.PORT || 8081;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

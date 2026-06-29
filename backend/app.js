const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes"); // NEW

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/watchlist", watchlistRoutes); // NEW

module.exports = app;
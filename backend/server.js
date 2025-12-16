const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.post("/Login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


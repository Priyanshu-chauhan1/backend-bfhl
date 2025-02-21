require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy User Details (Replace with actual user data)
const userDetails = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

// Route: GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Route: POST /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    let numbers = [];
    let alphabets = [];

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1 && /^[A-Za-z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).pop()] : [];

    res.status(200).json({
      is_success: true,
      ...userDetails,
      numbers,
      alphabets,
      highest_alphabet,
    });

  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

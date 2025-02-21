require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const userDetails = {
  user_id: "priyanshu_chauhan_17092000",
  email: "priyanshuchauhan1729@example.com",
  roll_number: "23BCS80038",
};

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
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

    const highest_alphabet = alphabets.length
      ? [alphabets.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).pop()]
      : [];

    res.status(200).json({
      is_success: true,
      ...userDetails,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

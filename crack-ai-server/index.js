const express = require("express");
const app = express();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/prompt", async (req, res) => {
  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  res.send({
    data: text,
    status: 200,
  });
});

app.get("/", (req, res) => {
  res.send({
    data: "server running!",
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});

const express = require("express");
const app = express();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const form = `

    <div
      style="
        min-height: 95vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: gainsboro;
      "
    >
      <form
        method="POST"
        action="/prompt"
        style="
          border: 2px solid gray;
          border-radius: 24px;
          padding: 2.5rem;
          font-size: 2rem;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        "
      >
        <textarea name="prompt" id="prompt"           autofocus="true" style="font-size: 1.2rem; padding: 0.5rem"></textarea>
        <button
          type="submit"
          style="
            padding-inline: 1.5rem;
            padding-block: 0.5rem;
            border-radius: 1rem;
            background-color: purple;
            text-transform: uppercase;
            font-size: 1.5rem;
          "
        >
          Generate
        </button>
      </form>
    </div>

`;

app.get("/prompt", async (req, res) => {
  res.send(form);
});

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;

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

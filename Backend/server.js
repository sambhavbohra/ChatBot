import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import personas from "./prompts/personas.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 5001);
const HOST = process.env.HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1");
const MODEL = process.env.OPENAI_MODEL || "llama-3.3-70b-versatile";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend running",
    model: MODEL,
    baseURL: process.env.OPENAI_BASE_URL || "OpenAI default",
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/personas", (req, res) => {
  res.json({
    personas: Object.keys(personas),
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { persona = "anshuman", messages = [] } = req.body;

    if (!persona || !personas[persona]) {
      return res.status(400).json({ error: "Invalid persona selected." });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "At least one message is required." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing API key." });
    }

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: personas[persona] },
        ...messages,
      ],
      temperature: 0.8,
    });

    const reply = completion.choices[0]?.message?.content || "No response generated.";
    res.json({ reply, persona, model: MODEL });
  } catch (error) {
    console.error("Chat completion failed:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
    });

    res.status(500).json({
      error: "Something went wrong while generating the response.",
      details:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

server.ref();

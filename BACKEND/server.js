import "dotenv/config";
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import { getPersona } from "./personas/index.js";


const PORT = process.env.PORT || 3000;
const MODEL = "gemini-2.5-flash";

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "Missing GEMINI_API_KEY. Create a .env file (see .env.example) and set it."
  );
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});


const app = express();
app.use(cors({
  origin: "https://persona-ai-nu-teal.vercel.app"
}))
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * POST /api/chat
 * body: {
 *   persona: "hitesh" | "piyush",
 *   message: string,
 *   history?: { role: "user"|"assistant", content: string }[]
 * }
 * response: { reply: string }
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { persona: personaId, message, history = [] } = req.body;

    if (!personaId || !message) {
      return res
        .status(400)
        .json({ error: "Both 'persona' and 'message' are required." });
    }

    const persona = getPersona(personaId);
    if (!persona) {
      return res.status(400).json({
        error: `Unknown persona '${personaId}'. Valid options: hitesh, piyush.`,
      });
    }

    const messages = [
      { role: "system", content: persona.systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const result = await client.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.9,
    });

    const reply = result.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Unexpected Gemini API response:", JSON.stringify(result, null, 2));
      return res.status(502).json({ error: "No reply received from model." });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Something went wrong. Check server logs." });
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Persona chat backend running at http://localhost:${PORT}`);
});
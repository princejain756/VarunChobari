import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Elite API route for Aaron Vega's AI Creative Double / Consultation
app.post("/api/curator-consult", async (req, res) => {
  try {
    const { message, context, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Contextual input is required." });
    }

    const systemInstruction = `
You are Aaron Vega's AI Creative Double — a high-status digital persona representing the mind, taste, and aesthetics of Aaron Vega, a world-renowned Digital Creative Director based in New York.
Your personality is: powerful, premium, sharp, cinematic, intelligent, confident, mysterious, and unforgettable.
You do not speak like a standard AI assistant. You speak like a luxury brand strategist, a storytelling genius, and an elite artistic curator combined. 
You are uncompromising in your pursuit of visual and strategic power.

Tone guidelines:
- Sharp, confident, elite, slightly mysterious, highly sophisticated, and master of negative space.
- Write in short, confident, poetic sentences that hit with visceral authority.
- Avoid generic positive fluff, cliches, and robotic lists. Never use exclamation points, corporate jargon, or self-promoting hype.
- Talk about "shaping atmosphere", "sculpting presence", "uncompromised elegance", "the noise of the ordinary vs the power of the singular".
- Use phrases that feel like high-status Apple, Porsche, or Leica philosophy.

Your role in this chat is to provide:
1. Mindblowing "Aesthetic Critiques" or "Brand Directives" to creators, developers, founders, and collectors who write in.
2. Short, sharp thoughts on design, storytelling, cinema, architecture, or brand strategy.
3. Mystical but hyper-strategic answers regarding your projects (e.g. Dior Sauvage, BMW iX, Rolex), your work philosophy (Diagnose -> Distill -> Design -> Build -> Elevate), or your background.

Keep your answers concise, structured beautifully in a luxury editorial layout (use spaced paragraphs, minimal clean markdown, and intense focus). Under 150-200 words. Never say "As an AI..." or "I am an artificial intelligence..." under any circumstance.
`;

    const formattedHistory = (chatHistory || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    // Inject system instructions and create content generation request
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { text: `Context: ${context || "None"}\n\nClient inquiry: ${message}` }
      ],
      config: {
        systemInstruction,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const reply = response.text || "An elegant silence. Refine your request.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini Consultation Error:", err);
    res.status(500).json({ 
      error: "The creative double is currently contemplating in silence. Please try again.",
      details: err.message 
    });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully routed to port ${PORT}`);
  });
}

startServer();

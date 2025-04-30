import { Router } from "express";
import { askBringoBot } from "../services/gpt";

const router = Router();

router.post("/", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "Missing message" });

  try {
    const reply = await askBringoBot(userMessage);
    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;

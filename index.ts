import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app = express();

import dotenv from "dotenv";
import { askBringoBot } from "./src/services/gpt";
import { twilioInstance } from "./src/services/twilio";
import { sendMessage } from "./src/services/mesages";
import { handleAudio } from "./src/services/audio";
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HElloWORLD");
});

app.post("/chat", async (req: Request, res: Response) => {
  const message = req.body;

  if (message.MediaContentType0 === "audio/ogg") {
    const question = await handleAudio(message.MediaUrl0);
    const reply = await askBringoBot(question);
    sendMessage(message.From, reply);
  } else {
    const reply = await askBringoBot(message.Body);
    sendMessage(message.From, reply );
  }

  res.json({ message: "Success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bringo AI bot running on port ${PORT}`));

export default app;

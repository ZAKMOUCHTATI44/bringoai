import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app = express();

import dotenv from "dotenv";
import { askBringoBot } from "./src/services/gpt";
import { twilioInstance } from "./src/services/twilio";
dotenv.config();

app.use(bodyParser.json());
// app.use("/chat", chatRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("HElloWORLD");
});

app.post("/chat", async (req: Request, res: Response) => {
  const message = req.body;
  const client = await twilioInstance();
  const reply = await askBringoBot(message.Body);
  client.messages
    .create({
      body: reply,
      from: "whatsapp:+212608615963",
      to: message.From,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bringo AI bot running on port ${PORT}`));

export default app;

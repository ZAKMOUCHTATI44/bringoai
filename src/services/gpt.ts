import fs from "fs";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

let usersPath = path.join(process.cwd(), "src/data/arma.txt");

const scenarioText = fs.readFileSync(usersPath, "utf-8");

export async function askBringoBot(message: string): Promise<string> {
  const chat = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `Tu es un assistant IA pour Bringo (livraison de courses). Utilise ce scénario comme base :\n\n${scenarioText}\n\nRéponds toujours dans la langue utilisée par l'utilisateur.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return chat.choices[0].message.content || "Désolé, je n'ai pas compris.";
}

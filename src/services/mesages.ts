import { twilioInstance } from "./twilio";

export async function sendMessage(to: string, body: string) {
  const client = await twilioInstance();

  client.messages
    .create({
      body: body,
      from: "whatsapp:+212608615963",
      to: to,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

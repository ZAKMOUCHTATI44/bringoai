import { Twilio } from "twilio";

export async function twilioInstance(): Promise<Twilio> {
  console.log(process.env.TWILIO_ACCOUNT_SID)
  console.log(`******************`)
  console.log(process.env.TWILIO_AUTH_TOKEN)
  const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client;
}

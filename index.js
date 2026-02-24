import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on("message", async (msg) => {
  if (!msg.text) return;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a smart AI assistant." },
        { role: "user", content: msg.text },
      ],
    });

    const reply = response.choices[0].message.content;
    await bot.sendMessage(msg.chat.id, reply);
  } catch (error) {
    console.error(error);
    await bot.sendMessage(msg.chat.id, "Xatolik yuz berdi.");
  }
});

console.log("Homework script started successfully")
const cron = require("node-cron");
const axios = require("axios");
const Homework = require("../models/Homework.js");

const BOT_TOKEN = process.env.HOMEWORK_BOT;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

cron.schedule("* * * * *", async () => {
  try {
    const homeworks = await Homework.find().populate("student");
    for (const hw of homeworks) {
      const message = `📚 *${hw.title}*\n\n${hw.description}`;
      for (const student of hw.student) {
        if (student.isActive && student.telegramId) {
          await axios.post(TELEGRAM_API, {
            chat_id: student.telegramId,
            text: message,
            parse_mode: "Markdown",
          });
        }
      }
    }
    console.log("Uyga vazifalar yuborildi");
  } catch (error) {
    console.error(error.message);
  }
});

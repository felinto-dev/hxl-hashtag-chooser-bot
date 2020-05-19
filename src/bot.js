import Telegraf from "telegraf";

const bot = new Telegraf(process.env.BOT_TELEGRAM_TOKEN);

export default bot;

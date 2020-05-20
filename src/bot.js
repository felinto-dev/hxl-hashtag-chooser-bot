import Telegraf from "telegraf";
import LocalSession from "telegraf-session-local";

const bot = new Telegraf(process.env.BOT_TELEGRAM_TOKEN);

bot.use(new LocalSession().middleware());

export default bot;

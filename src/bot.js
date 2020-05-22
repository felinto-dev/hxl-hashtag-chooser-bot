import Telegraf from "telegraf";
import LocalSession from "telegraf-session-local";
import rateLimit from "telegraf-ratelimit";

const bot = new Telegraf(process.env.BOT_TELEGRAM_TOKEN);

const limitConfig = {
  window: 1000,
  limit: 1,
};
bot.use(rateLimit(limitConfig));

bot.use(new LocalSession().middleware());

export default bot;

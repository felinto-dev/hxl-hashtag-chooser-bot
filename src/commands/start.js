import bot from "../bot";
import session from "telegraf/session";
import {
  pickOption,
  getNextQuestion,
  showFinalAnswer,
} from "./utils/inferences";

const get_HXL = (ctx, dest) => {
  getNextQuestion(ctx, dest);
};

bot.use(session());

bot.action(pickOption.filter({}), (ctx) => {
  const { source, option, dest } = pickOption.parse(
    ctx.update.callback_query.data
  );

  ctx.answerCbQuery();
  ctx.deleteMessage();

  if (dest !== "null") {
    get_HXL(ctx, dest);
  } else {
    showFinalAnswer(ctx, dest);
  }
});

export default (bot) => {
  bot.command(["start", "help"], (ctx) => {
    const starting_point = "top";
    get_HXL(ctx, starting_point);
  });
};

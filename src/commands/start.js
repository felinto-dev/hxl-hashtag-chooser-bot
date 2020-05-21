import bot from "../bot";
import {
  backMenu,
  pickOption,
  getNextQuestion,
  showFinalAnswer,
} from "./utils/inferences";
import { newMenuEntry } from "./utils/session-data";

const get_HXL = (ctx, dest) => {
  getNextQuestion(ctx, dest);
};

bot.action(pickOption.filter({}), (ctx) => {
  const { source, option, dest } = pickOption.parse(
    ctx.update.callback_query.data
  );
  newMenuEntry(ctx, source, option);

  ctx.answerCbQuery();
  ctx.deleteMessage();

  if (dest !== "null") {
    get_HXL(ctx, dest);
  } else {
    showFinalAnswer(ctx, dest);
  }
});

bot.action(backMenu.filter({}), (ctx) => {
  ctx.session.menu.pop();
  const { dest } = backMenu.parse(ctx.update.callback_query.data);

  ctx.answerCbQuery();
  ctx.deleteMessage();

  get_HXL(ctx, dest);
});

export default (bot) => {
  bot.command("start", (ctx) => {
    const starting_point = "top";
    ctx.session.menu = [{ current: starting_point }];
    get_HXL(ctx, starting_point);
  });
};

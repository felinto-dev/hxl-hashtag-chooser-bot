import bot from "../bot";
import {
  backMenu,
  pickOption,
  getNextQuestion,
  showFinalAnswer,
} from "./utils/inferences";
import {
  newMenuEntry,
  upsertSession,
  checkSessionAvailability,
} from "./utils/session-data";

const start_bot = (ctx) => {
  if (ctx.update.callback_query) {
    ctx.answerCbQuery();
  }

  const starting_point = "top";

  const session_id = upsertSession(ctx, starting_point);
  get_HXL(ctx, starting_point, session_id);
};

const get_HXL = (ctx, dest, session_id) => {
  getNextQuestion(ctx, dest, session_id);
};

bot.action("start", (ctx) => {
  start_bot(ctx);
});

bot.action(pickOption.filter({}), (ctx) => {
  const { source, option, dest, session_id } = pickOption.parse(
    ctx.update.callback_query.data
  );
  if (checkSessionAvailability(ctx, session_id)) {
    return;
  }

  newMenuEntry(ctx, source, option, session_id);

  ctx.answerCbQuery();
  ctx.deleteMessage();

  if (dest !== "null") {
    get_HXL(ctx, dest, session_id);
  } else {
    showFinalAnswer(ctx, source, session_id);
  }
});

bot.action(backMenu.filter({}), async (ctx) => {
  const { dest, session_id } = backMenu.parse(ctx.update.callback_query.data);
  if (checkSessionAvailability(ctx, session_id)) {
    return;
  }

  ctx.session[session_id].menu.pop();

  ctx.answerCbQuery();
  ctx.deleteMessage();

  get_HXL(ctx, dest, session_id);
});

export default (bot) => {
  bot.command("start", async (ctx) => {
    await ctx.reply(`👋👋👋 Welcome ${ctx.update.message.from.first_name}
Answer the questions below to generate your HXL tag!`);
    start_bot(ctx);
  });
};

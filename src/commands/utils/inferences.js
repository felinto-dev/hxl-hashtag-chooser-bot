import KB from "../../data/hxl-knowledge-base.json";
import { CallbackData } from "telegraf-callback-data";
import Markup from "telegraf/markup";

const backMenu = new CallbackData("backMenu", ["dest"]);
const pickOption = new CallbackData("pickOption", ["source", "option", "dest"]);
const getNextQuestion = (ctx, dest) => {
  const options = KB[dest].options.map((option, index) => {
    return [
      Markup.callbackButton(
        option.text,
        pickOption.new({
          source: dest,
          option: index,
          dest: option.dest || null,
        })
      ),
    ];
  });

  if (ctx.update["callback_query"] && ctx.session.menu.length > 1) {
    const source = ctx.session.menu[ctx.session.menu.length - 1].current;

    options.push([
      Markup.callbackButton(
        "⬅️ Back",
        backMenu.new({
          dest: source || "top",
        })
      ),
    ]);
  }
  ctx.reply(KB[dest].question, {
    ...Markup.inlineKeyboard(options).extra(),
  });
};

const showFinalAnswer = (ctx, dest) => {
  ctx.reply(ctx.session.menu[ctx.session.menu.length - 1].note);
};

export { backMenu, pickOption, getNextQuestion, showFinalAnswer };

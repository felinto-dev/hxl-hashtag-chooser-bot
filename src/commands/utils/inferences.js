import KB from "../../data/hxl-knowledge-base.json";
import { CallbackData } from "telegraf-callback-data";
import Markup from "telegraf/markup";

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
  ctx.reply(KB[dest].question, {
    ...Markup.inlineKeyboard(options).extra(),
  });
};

const showFinalAnswer = (ctx, dest) => {
  ctx.reply(dest);
};

export { pickOption, getNextQuestion, showFinalAnswer };

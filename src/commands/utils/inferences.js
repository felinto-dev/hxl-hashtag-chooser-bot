import KB from "../../data/hxl-knowledge-base.json";
import { CallbackData } from "telegraf-callback-data";
import Markup from "telegraf/markup";
import { hashtagCode } from "./session-data";
import { filterMenuOptions, getQuestionText } from "./questions";

const backMenu = new CallbackData("backMenu", ["dest"]);
const pickOption = new CallbackData("pickOption", ["source", "option", "dest"]);
const getNextQuestion = (ctx, dest) => {
  let options = KB[dest].options.map((option, index) => {
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
  options = filterMenuOptions(ctx, options);

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
  ctx.reply(getQuestionText(ctx, dest), {
    ...Markup.inlineKeyboard(options).extra(),
    parse_mode: "HTML",
  });
};

const showFinalAnswer = (ctx, dest) => {
  ctx.reply(
    `<b>Use this hashtag and attributes</b>

<code>${hashtagCode(ctx)}</code>

${ctx.session.menu[ctx.session.menu.length - 1].note || ""}
You are free to add more attributes, or to make up your own, if you need to make further distinctions.
`,
    {
      parse_mode: "HTML",
    }
  );
};

export { backMenu, pickOption, getNextQuestion, showFinalAnswer };

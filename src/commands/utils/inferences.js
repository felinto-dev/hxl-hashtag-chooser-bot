import KB from "../../data/hxl-knowledge-base.json";
import { CallbackData } from "telegraf-callback-data";
import Markup from "telegraf/markup";
import { hashtagCode } from "./session-data";
import { filterMenuOptions, getQuestionText } from "./questions";

const backMenu = new CallbackData("backMenu", ["dest", "session_id"]);
const pickOption = new CallbackData("pickOption", [
  "source",
  "option",
  "dest",
  "session_id",
]);
const getNextQuestion = (ctx, dest, session_id) => {
  let options = KB[dest].options.map((option, index) => {
    return [
      Markup.callbackButton(
        option.text,
        pickOption.new({
          source: dest,
          option: index,
          dest: option.dest || null,
          session_id: session_id,
        })
      ),
    ];
  });
  options = filterMenuOptions(ctx, options, session_id);

  if (ctx.update["callback_query"] && ctx.session[session_id].menu.length > 1) {
    const source =
      ctx.session[session_id].menu[ctx.session[session_id].menu.length - 1]
        .current;

    options.push([
      Markup.callbackButton(
        "⬅️ Back",
        backMenu.new({
          dest: source || "top",
          session_id,
        })
      ),
    ]);
  }
  ctx.reply(getQuestionText(ctx, dest, session_id), {
    ...Markup.inlineKeyboard(options).extra(),
    parse_mode: "HTML",
  });
};

const showFinalAnswer = (ctx, source, session_id) => {
  ctx.reply(
    `<b>Use this hashtag and attributes</b>

<code>${hashtagCode(ctx, session_id)}</code>

${
  ctx.session[session_id].menu[ctx.session[session_id].menu.length - 1].note ||
  ""
}
You are free to add more attributes, or to make up your own, if you need to make further distinctions.
`,
    {
      ...Markup.inlineKeyboard([
        [
          Markup.callbackButton(
            "⬅️ Back",
            backMenu.new({
              dest: source || "top",
              session_id,
            })
          ),
          Markup.callbackButton("🔎 Discover a new Hashtag", "start"),
        ],
      ]).extra(),
      parse_mode: "HTML",
    }
  );
};

export { backMenu, pickOption, getNextQuestion, showFinalAnswer };

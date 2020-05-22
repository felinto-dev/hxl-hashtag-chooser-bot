import KB from "../../data/hxl-knowledge-base.json";
import { getHashtag, hashtagCode } from "./session-data";
import { pickOption } from "./inferences";

const getQuestionText = (ctx, dest, session_id) => {
  const getPreText = () => {
    if (KB[dest]["pre-text"]) {
      return `

${KB[dest]["pre-text"]}`;
    } else {
      return ``;
    }
  };
  const getPostText = () => {
    if (KB[dest]["post-text"]) {
      return `
      
${KB[dest]["post-text"]}`;
    } else {
      return ``;
    }
  };
  const getHashtagCodeHTML = () => {
    if (hashtagCode(ctx, session_id)) {
      return `

So far <code>${hashtagCode(ctx, session_id)}</code>`;
    } else {
      return ``;
    }
  };
  return (
    "🤔 " +
    KB[dest].question +
    getPreText() +
    getPostText() +
    getHashtagCodeHTML()
  );
};

const filterMenuOptions = (ctx, options, session_id) => {
  return options.filter((option) => {
    const meta = pickOption.parse(option[0].callback_data);
    const meta_option = KB[meta.source].options[meta.option];
    if (
      meta_option["include"] &&
      !meta_option["include"].includes(getHashtag(ctx, session_id))
    ) {
      return;
    } else if (
      meta_option["exclude"] &&
      meta_option["exclude"].includes(getHashtag(ctx, session_id))
    ) {
      return;
    }
    return option;
  });
};

export { getQuestionText, filterMenuOptions };

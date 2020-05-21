import KB from "../../data/hxl-knowledge-base.json";
import { getHashtag, hashtagCode } from "./session-data";
import { pickOption } from "./inferences";

const getQuestionText = (ctx, dest) => {
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
    if (hashtagCode(ctx)) {
      return `

So far <code>${hashtagCode(ctx)}</code>`;
    } else {
      return ``;
    }
  };
  return (
    KB[dest].question + getPreText() + getPostText() + getHashtagCodeHTML()
  );
};

const filterMenuOptions = (ctx, options) => {
  return options.filter((option) => {
    const meta = pickOption.parse(option[0].callback_data);
    const meta_option = KB[meta.source].options[meta.option];
    if (
      meta_option["include"] &&
      !meta_option["include"].includes(getHashtag(ctx))
    ) {
      return;
    } else if (
      meta_option["exclude"] &&
      meta_option["exclude"].includes(getHashtag(ctx))
    ) {
      return;
    }
    return option;
  });
};

export { getQuestionText, filterMenuOptions };

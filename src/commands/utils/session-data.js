import KB from "../../data/hxl-knowledge-base.json";

const newMenuEntry = (ctx, source, option, session_id) => {
  ctx.session[session_id].menu.push({
    current: source,
    ...KB[source].options[option],
  });
};

const getUserPath = (ctx, session_id) => {
  const user_path = ctx.session[session_id].menu.map((option) => {
    return option.text || "Start";
  });
  return `${user_path.join(" » ")}`;
};

const getHashtag = (ctx, session_id) => {
  const hashtagItem = ctx.session[session_id].menu.find((item) => {
    return item.hashtag;
  });
  if (hashtagItem) {
    return `#${hashtagItem.hashtag}`;
  }
};

const hashtagCode = (ctx, session_id) => {
  const code = [getHashtag(ctx, session_id)];
  ctx.session[session_id].menu.forEach((item) => {
    if (item.attribute) {
      code.push(`+${item.attribute}`);
    }
  });
  return code.join(" ");
};

const upsertSession = (ctx, starting_point) => {
  ctx.session.counter = ctx.session.counter++ || 1
  ctx.session[ctx.session.counter] = { menu: [{ current: starting_point }] };
  return ctx.session.counter;
};

const checkSessionAvailability = (ctx, session_id) => {
  if (!ctx.session[session_id]) {
    ctx.answerCbQuery("Sorry, this menu is no longer available :(");
    return true;
  }
  return false;
};

export {
  newMenuEntry,
  getUserPath,
  getHashtag,
  hashtagCode,
  upsertSession,
  checkSessionAvailability,
};

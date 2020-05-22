import KB from "../../data/hxl-knowledge-base.json";

const newMenuEntry = (ctx, source, option, session_id) => {
  ctx.session[session_id].menu.push({
    current: source,
    ...KB[source].options[option],
  });
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
  if (ctx.session.counter) {
    ctx.session[ctx.session.counter + 1] = {
      menu: [{ current: starting_point }],
    };
    ctx.session.counter++;
  } else {
    ctx.session.counter = 1;
    ctx.session[ctx.session.counter] = { menu: [{ current: starting_point }] };
  }
  return ctx.session.counter;
};

export { newMenuEntry, getHashtag, hashtagCode, upsertSession };

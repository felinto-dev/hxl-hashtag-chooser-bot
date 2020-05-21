import KB from "../../data/hxl-knowledge-base.json";

const newMenuEntry = (ctx, source, option) => {
  ctx.session.menu.push({
    current: source,
    ...KB[source].options[option],
  });
};

const getHashtag = (ctx) => {
  const hashtagItem = ctx.session.menu.find((item) => {
    return item.hashtag;
  });
  if (hashtagItem) {
    return `#${hashtagItem.hashtag}`;
  }
};

const hashtagCode = (ctx) => {
  const code = [getHashtag(ctx)];
  ctx.session.menu.forEach((item) => {
    if (item.attribute) {
      code.push(`+${item.attribute}`);
    }
  });
  return code.join(" ");
};

export { newMenuEntry, getHashtag, hashtagCode };

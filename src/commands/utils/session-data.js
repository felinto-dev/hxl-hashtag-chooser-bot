import KB from "../../data/hxl-knowledge-base.json";

const newMenuEntry = (ctx, source, option) => {
  ctx.session.menu.push({
    current: source,
    ...KB[source].options[option],
  });
};

export { newMenuEntry };

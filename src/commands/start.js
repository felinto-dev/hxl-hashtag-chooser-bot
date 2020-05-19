export default (bot) => {
  bot.command(["start", "help"], (ctx) => {
    ctx.reply("I am alive!");
  });
};

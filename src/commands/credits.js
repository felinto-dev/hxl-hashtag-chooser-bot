export default (bot) => {
  bot.command("start", async (ctx) => {
    await ctx.reply(`👋👋👋 Welcome ${ctx.update.message.from.first_name}
Answer the questions below to generate your HXL tag!`);
    start_bot(ctx);
  });
  bot.command("credits", async (ctx) => {
    ctx.reply(`👋👋👋 Hello ${ctx.update.message.from.first_name}!
This bot was created by @felinto. This bot was created using a expert system (Artificial Intelligence) as part of a project from the Unidombosco faculty of the Data Science and Artificial Intelligence Course.

Do you want such an expert system for you or your company? Hire me 😎 @felinto`);
  });
};

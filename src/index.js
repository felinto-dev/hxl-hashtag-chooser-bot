import bot from "./bot";

import startCommand from "./commands/start";
startCommand(bot);
import creditsCommand from "./commands/credits";
creditsCommand(bot);

bot.launch();

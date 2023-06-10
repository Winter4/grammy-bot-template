// environment variables
import "dotenv/config";
import { Bot } from "grammy";

import { getConfig } from "./settings/config";
import { getClients } from "./settings/clients";

import type { CustomContext } from "./context";

import { preMiddlewares, errorHandler } from "./middlewares";

import commands from "./handlers/commands";

async function main() {
  // global app config
  const config = getConfig();
  // 3rd party clients, that should be inited
  const clients = await getClients(config);

  // init bot instance
  const bot = new Bot<CustomContext>(config.telegram.botToken);

  // apply pre-scenes middlewares
  bot.use(
    ...preMiddlewares(clients, {
      errorChatId: config.telegram.errorChatId,
      adminChatId: config.telegram.adminChatId,
    })
  );

  bot.use(commands);

  // error handler
  bot.catch(errorHandler);

  // set menu
  //await bot.api.setMyCommands([{ command: "start", description: "Главное меню" }]);

  // run bot
  bot.start();
  clients.logger.info("🤖 Bot is ready to ___");
}

main();

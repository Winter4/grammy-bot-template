import type { BotError, NextFunction } from "grammy";
import type { CustomContext } from "./context";
import type { BotClients } from "./settings/clients";

function extendContext(
  clients: BotClients,
  config: { errorChatId: string; adminChatId: string }
) {
  return (ctx: CustomContext, next: NextFunction) => {
    ctx.log = clients.logger;
    ctx.db = clients.database;
    ctx.config = config;

    return next();
  };
}

function logUpdates(ctx: CustomContext, next: NextFunction) {
  ctx.log.info({ ...ctx.update });
  return next();
}

export function preMiddlewares(
  clients: BotClients,
  config: { errorChatId: string; adminChatId: string }
) {
  return [extendContext(clients, config), logUpdates];
}

// - - - - - - - //

export async function errorHandler(err: BotError<CustomContext>) {
  let { ctx, message, stack } = err;

  ctx.log.error(`Update ${ctx.update.update_id} error \n` + stack);
  ctx.log.error({ ...ctx.update });
  if (!stack) stack = "Stack is empty";

  return ctx.api.sendMessage(
    ctx.config.errorChatId,
    `❌ Error: \n${message} \n\n` + `🔄 Update: \n${JSON.stringify(ctx.update)}`
  );
}

import type { Context } from "grammy";
import type { BotClients } from "./settings/clients";
import type { PrismaClient } from "@prisma/client";
import { refreshCacheFunction, updateCacheFunction } from "./cache";

// declare custom context type
export type CustomContext = Context & {
  log: BotClients["logger"];
  db: BotClients["database"];
  config: {
    errorChatId: string;
    adminChatId: string;
  };
};

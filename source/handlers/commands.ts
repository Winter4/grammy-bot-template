import { Composer } from "grammy";
import type { CustomContext } from "@src/context";

const commands = new Composer<CustomContext>();

commands.command("start", async (ctx: CustomContext) => {});

export default commands;

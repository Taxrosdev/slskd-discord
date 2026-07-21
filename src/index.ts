import { Client } from "discord.js";
import { register } from "./events"
import * as env from "./env"

export const client = new Client({ intents: [] });

register(client)

client.login(env.discord_token);

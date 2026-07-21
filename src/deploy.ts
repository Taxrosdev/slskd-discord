import { REST, Routes } from "discord.js";
import * as env from "./env"
import { commands as commandsCollection } from "./utils/commands";

const commands = commandsCollection.values().toArray().map((command) => command.data)

const rest = new REST().setToken(env.discord_token);

console.log(`Started refreshing ${commands.length} application (/) commands.`);
const data: any = await rest.put(Routes.applicationCommands(env.discord_clientid), { body: commands });
console.log(`Successfully reloaded ${data.length} application (/) commands.`);

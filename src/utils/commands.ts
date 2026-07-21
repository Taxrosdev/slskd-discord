import path from "node:path"
import fs from "node:fs/promises"
import type { Interaction, SlashCommandBuilder } from "discord.js";

export const commands: Map<string, { execute: (interaction: Interaction) => Promise<void>, data: SlashCommandBuilder }> = new Map();
const commandsFolder = path.join(__dirname, '../commands');

for (const file of await fs.readdir(commandsFolder)) {
    const filePath = path.join(commandsFolder, file);
    const command: any = await import(filePath);

    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


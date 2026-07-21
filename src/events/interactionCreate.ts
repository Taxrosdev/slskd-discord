import { download } from "@/api";
import { buildMessage } from "@/ui/message";
import { popups } from "@/ui/popup";
import { commands } from "@/utils/commands";
import { Client, Events, MessageFlags, type Interaction } from "discord.js";

export function register(client: Client) {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isButton()) {
            let data: { id: string; kind: string; action: string }
            try {
                data = JSON.parse(interaction.customId)
            } catch {
                interaction.reply({ content: "Expired", flags: ["Ephemeral"] })
                return
            }

            const session = popups[data.id]

            if (!session) {
                interaction.reply({ content: "Expired", flags: ["Ephemeral"] })
                return
            }

            if (data.action === "download") {
                const target = session.results[session.currentIndex]!
                await download(target.username, target)
                interaction.reply({ content: "Downloading...", flags: ["Ephemeral"] })
                return
            }

            if (data.action === "prev") {
                session.currentIndex = Math.max(0, session.currentIndex - 1)
            } else if (data.action === "next") {
                session.currentIndex = Math.min(session.results.length - 1, session.currentIndex + 1)
            }

            const { embed, buttonRow } = buildMessage(data.id, session.results, session.currentIndex)
            await interaction.update({ embeds: [embed], components: [buttonRow] })
            return
        }

        if (!interaction.isChatInputCommand()) return;
        const command: any = commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        command.execute(interaction).catch(async (e: any) => {
            console.error(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command.',
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command.',
                    flags: MessageFlags.Ephemeral,
                });
            }
        })
    })
}

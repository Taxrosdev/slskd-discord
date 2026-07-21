import { type ChatInputCommandInteraction, SlashCommandBuilder, ApplicationIntegrationType, MessageFlags } from "discord.js";
import { registerPopup } from "@/ui/popup";
import { getResults, submitSearch } from "@/api";
import { delay } from "@/utils";
import { buildMessage } from "@/ui/message";

export const data = new SlashCommandBuilder()
    .setName('search')
    .setDescription('Searches for a song/album')
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
    .addStringOption((option) => option
        .setName("query")
        .setDescription("Song/Album name")
        .setMinLength(3)
        .setRequired(true))

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const query = interaction.options.getString('query')
    if (!query) {
        await interaction.reply("No query?");
        return
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const id = await submitSearch(query);
    await delay(2500)
    const res = await getResults(id)

    if (res.length == 0) {
        await interaction.followUp({ content: "Not found.", flags: MessageFlags.Ephemeral })
        return
    }

    const sessionId = registerPopup(res, 0)
    const { embed, buttonRow } = buildMessage(sessionId, res, 0)
    await interaction.followUp({ embeds: [embed], components: [buttonRow], flags: MessageFlags.Ephemeral })
}

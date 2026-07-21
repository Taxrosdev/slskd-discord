import type { Result } from "@/api/types"
import { split } from "@/utils"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js"

export function buildMessage(sessionId: string, result: Result[], index: number): { embed: EmbedBuilder, buttonRow: ActionRowBuilder<ButtonBuilder> } {
    const target = result[index]!
    const dir = split(target.files[0]?.filename!).dir

    let embed = new EmbedBuilder()
        .setTitle(dir)
        .setAuthor({ name: target.username })
        .addFields(target.files.map((file) => {
            return { name: split(file.filename).filename, value: "" }
        }).slice(0, 24))

    if (target.files.length > 24) {
        embed = embed.addFields({ name: "File list truncated...", value: "" })
    }

    if (result.length > 1) {
        embed = embed.setFooter({ text: `Result ${index + 1} of ${result.length}` })
    }

    const makeId = (action: string) => JSON.stringify({ id: sessionId, kind: "search", action })

    const downloadButton = new ButtonBuilder()
        .setLabel("Download All")
        .setCustomId(makeId("download"))
        .setStyle(ButtonStyle.Primary)

    const components: ButtonBuilder[] = [downloadButton]

    if (result.length > 1) {
        const prevButton = new ButtonBuilder()
            .setLabel("Previous")
            .setCustomId(makeId("prev"))
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(index === 0)

        const nextButton = new ButtonBuilder()
            .setLabel("Next")
            .setCustomId(makeId("next"))
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(index === result.length - 1)

        components.splice(0, 0, prevButton, nextButton)
    }

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(components)

    return { embed, buttonRow }
}

import { Client, Events } from "discord.js";

export function register(client: Client) {
    client.once(Events.ClientReady, (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user}`);
    })
}

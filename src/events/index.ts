import type { Client } from "discord.js";
import { register as registerInteractionCreate } from "./interactionCreate"
import { register as registerReady } from "./ready"

export function register(client: Client) {
    registerReady(client);
    registerInteractionCreate(client);
}

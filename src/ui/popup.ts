import type { Result } from "@/api/types"

export interface PopupSession {
    results: Result[]
    currentIndex: number,
}

export const popups: { [key: string]: PopupSession } = {}

export function registerPopup(results: Result[], currentIndex: number): string {
    const id = crypto.randomUUID()

    popups[id] = { results, currentIndex }

    return id
}


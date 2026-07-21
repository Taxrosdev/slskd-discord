import * as env from "@/env";
import type { Result } from "./types";

export async function submitSearch(searchText: string): Promise<string> {
    const id = crypto.randomUUID()

    await post(
        "/api/v0/searches",
        { id, searchText }
    )

    return id
}

export async function getResults(id: string): Promise<Result[]> {
    const req = await get("/api/v0/searches/" + id + "/responses")

    let res = await req.json() as Result[]
    res = res.filter((response) => response.hasFreeUploadSlot)
    res = res.filter((response) => response.lockedFileCount == 0)
    res = res.filter((response) => response.files.length != 0)
    // Filter to highest upload speed
    res = res.sort((a, b) => b.uploadSpeed - a.uploadSpeed)

    return res
}

export function download(username: string, result: Result) {
    return post(
        "/api/v0/transfers/downloads/" + username,
        result.files.map((file) => {
            return { filename: file.filename, size: file.size }
        })
    )
}

async function get(url: string): Promise<Response> {
    const res = await fetch(env.slskd_apiurl + url, {
        headers: { "X-Api-Key": env.slskd_apikey! }
    })

    if (!res.ok) {
        throw new Error("Error fetching from slskd: " + res.statusText)
    }

    return res
}

async function post(url: string, data: {}): Promise<Response> {
    const res = await fetch(env.slskd_apiurl + url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "X-Api-Key": env.slskd_apikey!,
            "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        throw new Error("Error fetching from slskd: " + res.statusText)
    }

    return res
}

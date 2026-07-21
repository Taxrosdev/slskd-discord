export const discord_clientid = env("DISCORD_CLIENTID")
export const discord_token = env("DISCORD_TOKEN")
export const slskd_apikey = env("SLSKD_APIKEY")
export const slskd_apiurl = env("SLSKD_APIURL")

function env(name: string): string {
    const val = process.env[name];

    if (!val) {
        console.error(`Environment variable ${name} not found.`)
        process.exit(1)
    }

    return val
}

import { NextResponse } from "next/server"
import { factory } from "@/libs/server/factory"
import path from "path"
import fs from "fs/promises"

const cacheKey = "APP-SETTINGS"

export async function GET() {
    const cacheService = factory.buildCacheService()
    let appSettings = cacheService.tryGetAsync(cacheKey)

    if (appSettings) return NextResponse.json(appSettings)

    let count = 0

    const dirname = path.join(__dirname, "(data)")
    const files = await fs.readdir(dirname)

    for (const file of files) {
        const filePath = path.join(dirname, file)
        // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
        const content = await fs.readFile(filePath, "utf8")
        appSettings = JSON.parse(content)

        // cache by year, expected manual cache invalidations
        await cacheService.trySetAsync(cache, appSettings)
    }

    return NextResponse.json(appSettings)
}
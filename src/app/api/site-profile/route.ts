import { NextResponse } from "next/server"
import { factory } from "@/libs/server/factory"

const cacheKey = "APP-SETTINGS"

export async function GET() {

    const cacheService = factory.cacheService()

    let cache = await cacheService.tryGetAsync(cacheKey)

    if (cache) return NextResponse.json(cache)

    const appSettings = await factory.masterDataRepository().loadAppSettingsAsync()

    await cacheService.trySetAsync(cacheKey, appSettings)

    return NextResponse.json(appSettings)
}
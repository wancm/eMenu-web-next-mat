import { NextResponse } from "next/server"
import { factory } from "@/libs/server/factory"

const cacheKey = "APP-SETTINGS"

export async function GET() {

    const cacheService = factory.buildCacheService()

    let appSettings = await cacheService.tryGetAsync(cacheKey)

    if (appSettings) return appSettings

    appSettings = factory.buildMasterDataRepository().getAppSettingsAsync()
    await cacheService.trySetAsync(cacheService, appSettings)

    return NextResponse.json(appSettings)
}
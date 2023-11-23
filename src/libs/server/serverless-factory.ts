import { MemoryCacheService } from "@/libs/shared/cache/memory-cache-service"
import { SessionServiceLogic } from "@/libs/server/logic/sessions/session-service-logic"
import { SessionService } from "@/libs/server/types/services/session-service"
import { CacheService } from "@/libs/server/types/services/cache-service"

/*** Singleton instances *******/
const memoryCacheService = new MemoryCacheService()
const sessionService = new SessionServiceLogic(memoryCacheService)

export const serverlessFactory = {
    buildCacheService: (): CacheService => {
        return memoryCacheService
    },
    buildSessionService: (): SessionService => {
        return sessionService
    }
} as const


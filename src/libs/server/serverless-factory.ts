import { MemoryCacheService } from "@/libs/shared/cache/memory-cache-service"
import { SessionServiceLogic } from "@/libs/server/logic/sessions/session-service-logic"
import { SessionService } from "@/libs/server/types/services/session-service"
import { CacheService } from "@/libs/server/types/services/cache-service"
import { ClientInfoServiceLogic } from "@/libs/server/logic/client-info/client-info-service.logic"
import { ClientInfoService } from "@/libs/server/types/services/client-info.service"

/*** Singleton instances *******/
const memoryCacheService = new MemoryCacheService()
const sessionService = new SessionServiceLogic(memoryCacheService)
const clientInfoService = new ClientInfoServiceLogic()

/**
 * Factory that internally building instances that are supported by Vercel Edge function.
 * This factory is useful in context such as Next.js Middleware.
 * Vercel Edge function only has limited node.js functionality.
 * lib such as MongoDbClient is not supported in Vercel Edge function.
 */
export const serverlessFactory = {
    buildCacheService: (): CacheService => {
        return memoryCacheService
    },
    buildSessionService: (): SessionService => {
        return sessionService
    },
    buildClientInfoService: (): ClientInfoService => {
        return clientInfoService
    },
} as const


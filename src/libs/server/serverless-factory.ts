import { MemoryCacheService } from "@/libs/shared/cache/memory-cache-service"
import { SessionServiceLogic } from "@/libs/server/logic/sessions/session-service-logic"
import { SessionService } from "@/libs/server/types/services/session-service"
import { CacheService } from "@/libs/server/types/services/cache.service"
import { ClientInfoServiceLogic } from "@/libs/server/logic/client-info/client-info-service.logic"
import { ClientInfoService } from "@/libs/server/types/services/client-info.service"

/**
 * Factory that internally building instances that are supported by Vercel Edge function.
 * This factory is useful in context such as Next.js Middleware.
 * Vercel Edge function only has limited node.js functionality.
 * lib such as MongoDbClient is not supported in Vercel Edge function.
 */

class ServerlessFactory {
    private cacheServiceVal: CacheService | undefined
    private sessionServiceVal: SessionService | undefined
    private clientInfoServiceVal: ClientInfoService | undefined

    cacheService(): CacheService {
        if (!this.cacheServiceVal) {
            this.cacheServiceVal = new MemoryCacheService()
        }
        return this.cacheServiceVal
    }

    sessionService(): SessionService {
        if (!this.sessionServiceVal) {
            this.sessionServiceVal = new SessionServiceLogic(this.cacheService())
        }
        return this.sessionServiceVal
    }

    clientInfoService(): ClientInfoService {
        if (!this.clientInfoServiceVal) {
            this.clientInfoServiceVal = new ClientInfoServiceLogic()
        }
        return this.clientInfoServiceVal
    }
}

export const serverlessFactory = new ServerlessFactory()
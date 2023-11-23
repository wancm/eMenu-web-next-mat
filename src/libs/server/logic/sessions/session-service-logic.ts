import { CacheService } from "@/libs/server/types/services/cache-service"
import { Session } from "@/libs/shared/types/session"
import { SessionService } from "@/libs/server/types/services/session-service"
import { util } from "@/libs/shared/utils/util"

export class SessionServiceLogic implements SessionService {
    private readonly prefix = "SESSION-"
    private readonly sessionTTL = 20 * 60 // 20 minutes

    constructor(private cacheService: CacheService) {
    }

    async initAsync(sessionTTL: number = 0): Promise<Session> {

        if (!(sessionTTL > 0)) {
            sessionTTL = this.sessionTTL
        }

        const id = util.genId()

        const session = {
            id
        } as const

        await this.cacheService.trySetAsync(`${this.prefix}${id}`, session, sessionTTL)

        return session
    }

    async getAsync(id: string): Promise<Session> {
        return await this.cacheService.tryGetAsync(`${this.prefix}${id}`)
    }

    async expiredAsync(id: string): Promise<number> {
        return await this.cacheService.tryExpiredAsync(`${this.prefix}${id}`)
    }

    async resetExpiryAsync(id: string): Promise<number> {
        return await this.cacheService.extendExpiryAsync(`${this.prefix}${id}`, this.sessionTTL)
    }
}


if (import.meta.vitest) {
    const { describe, expect, test, vi, afterEach } = import.meta.vitest
    describe("#session-service-logic.ts", () => {

        afterEach(() => {
            vi.restoreAllMocks()
        })

    })
}
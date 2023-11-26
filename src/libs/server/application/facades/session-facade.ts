import { Session } from "@/libs/shared/types/session"
import { SessionService } from "@/libs/server/types/services/session-service"
import { serverlessFactory } from "@/libs/server/serverless-factory"

export class SessionFacade {

    // session lives for 20 minutes
    private sessionTTL = 20 * 60
    private sessionService: SessionService = serverlessFactory.buildSessionService()

    async initAsync(): Promise<Session> {
        return this.sessionService.initAsync(this.sessionTTL)
    }

    async getAsync(id: string): Promise<Session> {
        return this.sessionService.getAsync(id)
    }

    async resetExpiryAsync(id: string): Promise<number> {
        return await this.sessionService.resetExpiryAsync(id, this.sessionTTL)
    }
}

export const sessionFacade = new SessionFacade()
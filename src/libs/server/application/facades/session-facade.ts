import { Session } from "@/libs/shared/types/session"
import { SessionService } from "@/libs/server/types/services/session-service"
import { serverlessFactory } from "@/libs/server/serverless-factory"

export class SessionFacade {

    private sessionService: SessionService = serverlessFactory.buildSessionService()

    async initAsync(): Promise<Session> {
        // init session that lives for 20 minutes
        return this.sessionService.initAsync(20 * 60)
    }

    async getAsync(id: string): Promise<Session> {
        return this.sessionService.getAsync(id)
    }

    async resetExpiryAsync(id: string): Promise<number> {
        return await this.sessionService.resetExpiryAsync(id)
    }
}

export const sessionFacade = new SessionFacade()
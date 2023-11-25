import { MemoryCacheService } from "@/libs/shared/cache/memory-cache-service"
import { SessionServiceLogic } from "@/libs/server/logic/sessions/session-service-logic"
import { MongoDbPersonRepository } from "@/libs/server/data/repositories/mongodb-person-repository"
import { SessionService } from "@/libs/server/types/services/session-service"
import { CacheService } from "@/libs/server/types/services/cache-service"
import { BusinessUnitsRepository } from "@/libs/server/types/repositories/business-units-repository"
import { MongoDbBusinessUnitsRepository } from "@/libs/server/data/repositories/mongodb-business-units-repository"
import { MasterDataRepository } from "@/libs/server/types/repositories/master-data-repository"
import { MongodbMasterDataRepository } from "@/libs/server/data/repositories/mongodb-master-data-repository"
import { ClientInfoServiceLogic } from "@/libs/server/logic/client-info/client-info-service.logic"
import { ClientInfoService } from "@/libs/server/types/services/client-info.service"

/*** Singleton instances *******/
const memoryCacheService = new MemoryCacheService()
const personRepository = new MongoDbPersonRepository()
const sessionService = new SessionServiceLogic(memoryCacheService)
const businessUnitRepository = new MongoDbBusinessUnitsRepository()
const masterDataRepository = new MongodbMasterDataRepository()
const clientInfoService = new ClientInfoServiceLogic()

export const factory = {
    buildCacheService: (): CacheService => {
        return memoryCacheService
    },
    buildSessionService: (): SessionService => {
        return sessionService
    },
    buildClientInfoService: (): ClientInfoService => {
        return clientInfoService
    },
    buildBusinessUnitRepository: (): BusinessUnitsRepository => {
        return businessUnitRepository
    },
    buildMasterDataRepository: (): MasterDataRepository => {
        return masterDataRepository
    },
} as const


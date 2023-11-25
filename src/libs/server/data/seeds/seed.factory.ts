import { MongodbMasterDataRepository } from "@/libs/server/data/repositories/mongodb-master-data-repository"

class SeedFactory {
    async initAsync() {
    }

}

export const seedFactory = new SeedFactory();

// https://stackoverflow.com/questions/40745153/es8-immediately-invoked-async-function-expression
(async () => {
    await seedFactory.initAsync()
})().catch(err => {
    console.error(err)
})
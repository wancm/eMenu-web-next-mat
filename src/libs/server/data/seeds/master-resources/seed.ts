import { Collection } from "mongodb"
import { appMongodb } from "@/libs/server/data/mongodb/mongodb-database"
import { MONGO_DB_CONSTANT } from "@/libs/server/data/mongodb/mongodb_const"
import fs from "fs/promises"
import path from "path"
import { Resource, Resources } from "@/libs/shared/types/resource"
import { MongodbMasterDataRepository } from "@/libs/server/data/repositories/mongodb-master-data-repository"
import { seedFactory } from "@/libs/server/data/seeds/seed.factory"

export class Seed {
    constructor() {
    }

    async runAsync(): Promise<number> {
        let count = 0

        try {
            const masterDataRepository = seedFactory.masterDataRepository
            const dirname = path.join(__dirname, "data")
            const files = await fs.readdir(dirname)
            for (const file of files) {
                const filePath = path.join(dirname, file)
                // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
                const content = await fs.readFile(filePath, "utf8")
                const resources = JSON.parse(content) as Resources

                const found = await masterDataRepository.loadResourcesAsync(resources.identifier)
                if (!found) {
                    count++
                    await masterDataRepository.saveResourcesAsync(resources)
                }
            }
        } catch {
            count = -1
        }


        return count
    }
}

if (import.meta.vitest) {
    const { describe, expect, test, beforeEach } = import.meta.vitest

    const seed = new Seed()

    beforeEach(async (context) => {
    })

    describe("#seed.ts", () => {

        const test1 = ".run()"
        test(test1, async () => {
            console.time(test1)

            const result = await seed.runAsync()
            expect(result >= 0).toBeTruthy()

            console.timeEnd(test1)
        }, 60000)
    })
}
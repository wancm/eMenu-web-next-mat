import fs from "fs/promises"
import path from "path"
import { Dictionary } from "@/libs/shared/types/dictionary"
import { DictionaryRepository } from "@/libs/server/types/repositories/dictionary.repository"
import { MongodbDictionaryRepository } from "@/libs/server/data/repositories/mongodb-dictionary.repository"

export class Seed {
    constructor(private dictionaryRepository: DictionaryRepository) {
    }

    async runAsync(): Promise<number> {
        let count = 0

        try {
            const dirname = path.join(__dirname, "data")
            const files = await fs.readdir(dirname)
            for (const file of files) {
                const filePath = path.join(dirname, file)
                // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
                const content = await fs.readFile(filePath, "utf8")
                const dictionary = JSON.parse(content) as Dictionary

                const found = await this.dictionaryRepository.loadDictionaryAsync(dictionary.identifier)
                if (!found) {
                    count++
                    await this.dictionaryRepository.saveDictionaryAsync(dictionary)
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

    const dictionaryRepository = new MongodbDictionaryRepository()
    const seed = new Seed(dictionaryRepository)

    beforeEach(async (context) => {
    })

    describe("#seed.ts", () => {

        const test1 = ".run()"
        test(test1, async () => {
            console.time(test1)
            const result = await seed.runAsync()
            expect(result > -1).toBeTruthy()

            console.timeEnd(test1)
        }, 60000)
    })
}
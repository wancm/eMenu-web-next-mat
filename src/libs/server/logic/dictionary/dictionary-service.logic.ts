import { Dictionary } from "@/libs/shared/types/dictionary"
import { DictionaryService } from "@/libs/shared/types/services/dictionary.service"
import { CacheService } from "@/libs/server/types/services/cache-service"
import { DictionaryRepository } from "@/libs/server/types/repositories/dictionary.repository"
import { CONSTANTS } from "@/libs/shared/constants"
import { util } from "@/libs/shared/utils/util"


export class DictionaryServiceLogic implements DictionaryService {

    private readonly IDENTIFIER = "{language}-{level}"


    constructor(private cacheService: CacheService,
                private dictionaryRepository: DictionaryRepository) {
    }

    async loadDictionaryAsync(businessUnitId: string, countryCode: string, languages: string[]): Promise<Dictionary | undefined> {
        if (!languages || languages.length === 0) {
            languages = ["en"]
        }

        return undefined
    }

    private async loadAsync(businessUnitId: string, countryCode: string, language: string): Promise<Dictionary | undefined> {

        // load by language code to get the default dictionary. ex: en
        const dictionary = await this.dictionaryRepository.loadDictionaryAsync(language)

        if (!dictionary) return undefined

        // try override by country level. ex: en-MY
        const countryKey = this.IDENTIFIER
            .replace("{language}", language)
            .replace("{level}", countryCode)

        const countryDictionary = await this.dictionaryRepository.loadDictionaryAsync(countryKey)

        if (countryDictionary?.web?.contents) {
            dictionary.web.contents.forEach(content => {
                // try get override-able content
                const found = dictionary.web.contents.find(c => c.key.isEqual(content.key)) as any

                // if overridden content is available
                if (found) {
                    // override the properties if applicable
                    this.objPropOverridden(content, found)
                }
            })
        }

        // try override by unit level. ex: en-@businessUnitId
        const unitKey = this.IDENTIFIER
            .replace("{language}", language)
            .replace("{level}", businessUnitId)

        const unitDictionary = await this.dictionaryRepository.loadDictionaryAsync(unitKey)

        if (unitDictionary?.web?.contents) {
            unitDictionary.web.contents.forEach(content => {
                // try get override-able content
                const found = dictionary.web.contents.find(c => c.key.isEqual(content.key)) as any

                // if overridden content is available
                if (found) {
                    // override the properties if applicable
                    this.objPropOverridden(content, found)
                }
            })
        }

        return dictionary
    }

    private objPropOverridden(obj: any, objToCheckForOverrideableProp: any) {
        Object.keys(obj).forEach((key: string) => {

            // if property is an object type
            if (util.isObject(objToCheckForOverrideableProp[key])) {
                // recursive loop to check for override-able property
                this.objPropOverridden(obj[key], objToCheckForOverrideableProp[key])
            } else {
                // if override-able property is available
                if (objToCheckForOverrideableProp[key]) {
                    // override the property
                    obj[key] = objToCheckForOverrideableProp[key]
                }
            }

        })
    }

    updateContentAsync(businessUnitId: string, countryCode: string, language: string, key: string, content: string): Promise<number> {
        throw new Error("Method not implemented.")
    }

}
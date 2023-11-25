import { Dictionary } from "@/libs/shared/types/dictionary"

export type DictionaryService = {
    loadDictionaryAsync(businessUnitId: string, countryCode: string, languages: string[]): Promise<Dictionary | undefined>

    updateContentAsync(businessUnitId: string, countryCode: string, language: string, key: string, content: string): Promise<number>
}
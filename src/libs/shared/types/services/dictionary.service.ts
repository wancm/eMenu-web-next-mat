import { Dictionary, DictionaryContent } from "@/libs/shared/types/dictionary"

export type DictionaryService = {
    loadDictionaryAsync(): Promise<Dictionary | undefined>

    loadDictionaryWithParamsAsync(businessUnitId: string | undefined, countryCode: string | undefined, languages: string[] | undefined): Promise<Dictionary | undefined>

    updateContentAsync(businessUnitId: string | undefined, countryCode: string | undefined, language: string | undefined, key: string, content: string): Promise<number>
}
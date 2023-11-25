import { Dictionary, DictionaryContentFields } from "@/libs/shared/types/dictionary"

export type DictionaryRepository = {
    loadDictionaryAsync(identifier: string): Promise<Dictionary>

    saveDictionaryAsync(dictionary: Dictionary): Promise<string>

    updateDictionaryWebContentAsync(identifier: string, key: string, content: string): Promise<number>
}
import { Dictionary, DictionaryContent } from "@/libs/shared/types/dictionary"
import "@/libs/shared/extension-methods"

export class DictionaryHandler {

    constructor(public dictionary: Dictionary) {
    }

    getContent(key: string): DictionaryContent | undefined {
        if (!this.dictionary?.web.contents) return undefined
        return this.dictionary.web.contents.find(c => c.key ? c.key?.isEqual(key) : false)
    }
}
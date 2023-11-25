export type DictionaryContent = {
    key: string;
    content: string;
    category?: string;
    hint?: string;
    errors?: {
        validate?: string;
        required?: string;
        min?: string;
        max?: string;
        pattern?: string;
    },
    rules?: {
        required?: boolean;
        min?: number;
        max?: number;
        pattern?: RegExp
    }
}

export type DictionaryContentFields = keyof DictionaryContent

export type Dictionary = {
    identifier: string;
    web: {
        contents: DictionaryContent[]
    }
}
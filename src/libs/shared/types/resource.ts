export type Resource = {
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

export type Resources = {
    identifier: string;
    web: Resource[];
}
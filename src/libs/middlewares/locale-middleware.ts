import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { GLOBAL_CONSTANTS } from "@/global-constants"

// https://nbellocam.dev/blog/next-middleware-i18n

const DEFAULT_LANGUAGE = "en"

export async function localeMiddleware(request: NextRequest) {
    const language =
        request.cookies.get("NEXT_LOCALE") ?? getBrowserLanguage(request) ?? DEFAULT_LANGUAGE

    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.LANGUAGE, language.toString() ?? DEFAULT_LANGUAGE)

    console.log('page.tsx', requestHeaders.get(GLOBAL_CONSTANTS.HTTP_HEADER.LANGUAGE))

    const response = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    })
    response.headers.set(GLOBAL_CONSTANTS.HTTP_HEADER.LANGUAGE, language.toString() ?? DEFAULT_LANGUAGE)

    console.log('locale middleware')

    return response
}

// list out all the supporting languages
const LOCALES = ["en", "zh"]

const getBrowserLanguage = (req: NextRequest) => {
    return req.headers
        .get("accept-language")
        ?.split(",")
        .map((i) => i.split(";"))
        ?.reduce(
            (ac: { code: string; priority: string }[], lang) => [
                ...ac,
                { code: lang[0], priority: lang[1] },
            ],
            []
        )
        ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
        ?.find((i) => LOCALES.includes(i.code.substring(0, 2)))
        ?.code?.substring(0, 2)
}
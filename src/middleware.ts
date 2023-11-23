import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { GLOBAL_CONSTANTS } from "@/global-constants"
import { sessionFacade } from "@/libs/server/application/facades/session-facade"
import "@/libs/shared/extension-methods"

export async function middleware(request: NextRequest) {// read more. how to connect multiple middlewares
    // https://stackoverflow.com/questions/76603369/how-to-use-multiple-middlewares-in-next-js-using-the-middleware-ts-file

    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers)

    // set origin
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.ORIGIN, request.nextUrl.origin)

    const sessionId = await initSession(request)
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)

    const language =
        request.cookies.get("NEXT_LOCALE") ?? getBrowserLanguage(request) ?? DEFAULT_LANGUAGE

    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.LANGUAGE, language.toString() ?? DEFAULT_LANGUAGE)

    const response = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    })

    response.cookies.set(GLOBAL_CONSTANTS.COOKIE.SESSION_ID, sessionId)
    response.headers.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)


    return response
}

const initSession = async (request: NextRequest): Promise<string> => {
    const sessionCookie = request.cookies.get(GLOBAL_CONSTANTS.COOKIE.SESSION_ID)

    let sessionId = sessionCookie?.value
    if (sessionId && !sessionId.isNilOrEmpty()) {
        const session = await sessionFacade.getAsync(sessionId)
        if (session) {
            // reset the expiry date
            const result = await sessionFacade.resetExpiryAsync(session.id)
            if (result >= 0)
                return session.id
        }
    }

    const session = await sessionFacade.initAsync()
    return session.id
}

const DEFAULT_LANGUAGE = "en"

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

// https://nextjs.org/docs/pages/building-your-application/routing/middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
}

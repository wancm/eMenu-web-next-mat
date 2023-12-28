import { GLOBAL_CONSTANTS } from "@/global-constants"
import { sessionFacade } from "@/libs/server/application/facades/session-facade"
import "@/libs/shared/extension-methods"
import { serverlessFactory } from "@/libs/server/serverless-factory"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(req: NextRequest) {// read more. how to connect multiple middlewares
    // https://stackoverflow.com/questions/76603369/how-to-use-multiple-middlewares-in-next-js-using-the-middleware-ts-file

    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(req.headers)

    // set origin
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.ORIGIN, req.nextUrl.origin)

    // set session id
    const sessionId = await initSession(req)
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)

    // set client info
    const clientInfo = serverlessFactory.clientInfoService().get(req)
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.CLIENT_INFO, JSON.stringify(clientInfo))

    const res = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    })

    // set session id to response cookie
    res.cookies.set(GLOBAL_CONSTANTS.COOKIE.SESSION_ID, sessionId)

    // set session id to response header
    res.headers.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)


    return res
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

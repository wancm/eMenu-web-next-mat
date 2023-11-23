import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { GLOBAL_CONSTANTS } from "@/global-constants"
import { sessionFacade } from "@/libs/server/application/facades/session-facade"

// This function can be marked `async` if using `await` inside
export async function sessionMiddleware(request: NextRequest) {

    // read more. how to connect multiple middlewares
    // https://stackoverflow.com/questions/76603369/how-to-use-multiple-middlewares-in-next-js-using-the-middleware-ts-file

    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers)

    // set origin
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.ORIGIN, request.nextUrl.origin)

    const sessionId = await initSession(request)
    requestHeaders.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)

    const response = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    })

    response.cookies.set(GLOBAL_CONSTANTS.COOKIE.SESSION_ID, sessionId)
    response.headers.set(GLOBAL_CONSTANTS.HTTP_HEADER.SESSION_ID, sessionId)

    console.log('session middleware')

    return response
}

const initSession = async (request: NextRequest): Promise<string> => {
    const sessionCookie = request.cookies.get(GLOBAL_CONSTANTS.COOKIE.SESSION_ID)

    let sessionId = sessionCookie?.value
    if (sessionId) {
        const session = await sessionFacade.getAsync(sessionId)
        if (session) {
            // reset the expiry date
            await sessionFacade.resetExpiryAsync(session.id)
            return session.id
        }
    }

    const session = await sessionFacade.initAsync()
    return session.id
}
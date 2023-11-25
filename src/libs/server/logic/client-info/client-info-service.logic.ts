import { ClientInfoService } from "@/libs/server/types/services/client-info.service"
import { ClientInfo } from "../../types/clilent-info"
import { NextRequest } from "next/server"
import { GLOBAL_CONSTANTS } from "@/global-constants"
import { headers } from "next/headers"

export const getIp = (req: NextRequest): string | undefined => {
    // https://stackoverflow.com/questions/68338838/how-to-get-the-ip-address-of-the-client-from-server-side-in-next-js-app
    // https://github.com/vercel/next.js/discussions/33435
    return req?.headers.get("x-real-ip") || req?.headers?.get("x-forwarded-for") || req?.ip
}

/**
 * Only works if you host in Vercel
 */
export const getCountry = (req: NextRequest): string | undefined => {
    // https://reacthustle.com/blog/nextjs-get-the-user-country?expand_article=1
    return req?.geo?.country
}

export const getBrowserLanguage = (req: NextRequest): string[] | undefined => {
    // https://nbellocam.dev/blog/next-middleware-i18n
    return req?.headers
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
        ?.map((i) => i.code.substring(0, 2))
}

export class ClientInfoServiceLogic implements ClientInfoService {
    get(req?: NextRequest): ClientInfo | undefined {

        if (req) {
            return {
                ip: getIp(req),
                country: getCountry(req),
                preferredLanguages: getBrowserLanguage(req)
            }
        }

        const header = headers().get(GLOBAL_CONSTANTS.HTTP_HEADER.CLIENT_INFO)

        if (header) return JSON.parse(header) as ClientInfo

        return undefined
    }
}
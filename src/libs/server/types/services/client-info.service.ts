import { ClientInfo } from "@/libs/server/types/clilent-info"
import { NextRequest } from "next/server"

/**
 * Next.js dependant service
 */
export type ClientInfoService = {
    get(req?: NextRequest): ClientInfo | undefined
}
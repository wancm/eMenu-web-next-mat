// import { Connect } from "vite"
// import NextFunction = Connect.NextFunction
// import { AppDateUtil } from "@/libs/shared/utils/app-date-util"
//
//
// export const basicInfoLogger = (req: Request, res: Response, next: NextFunction) => {
//
//     const { protocol, originalUrl, baseUrl, headers, method } = req
//
//     console.log(`${AppDateUtil.utcNowToDateStr()}`, `[${method}] ${protocol}://${headers.host}${originalUrl}`)
//
//     if (req.body) {
//         console.log("body", JSON.stringify(req.body))
//     }
//
//     next()
// }

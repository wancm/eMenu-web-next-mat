import { NextFunction, Request, Response } from "express"
import { UtilDate } from "@/libs/shared/utils/util-date"

export const basicInfoLogger = (req: Request, res: Response, next: NextFunction) => {

  const { protocol, originalUrl, baseUrl, headers, method } = req

  console.log(`${UtilDate.utcNowDateTimeStr()}`, `[${method}] ${protocol}://${headers.host}${originalUrl}`)

  if (req.body) {
    console.log("body", JSON.stringify(req.body))
  }

  next()
}

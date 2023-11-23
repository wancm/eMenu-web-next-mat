import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { appSettings } from "@/libs/appSettings"
import { v4 as uuidv4 } from "uuid"

dayjs.extend(utc)

class Util {
    /**
     * Check if input is String type.
     * @return true if it's String type.
     * @return false if nil.
     */
    isStr(val: unknown): val is string {
        if (this.isNil(val)) return false
        // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
        return (typeof val === "string" || val instanceof String)
    }

    /**
     * Check if input is Number type.
     * @return true if it's Number type.
     * @return false if nil.
     */
    isNumber(val: unknown): val is number {
        if (this.isNil(val)) return false
        // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
        return (typeof val === "number")
    }

    /**
     * Check if input is Boolean type.
     * @return true if it's Boolean type.
     * @return false if nil.
     */
    isBoolean(val: unknown): val is boolean {
        if (this.isNil(val)) return false
        // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
        return (typeof val === "boolean")
    }

    /**
     * Check if input is Object type.
     * @return true if it's String type.
     * @return true if it's Array type.
     * @return false if nil.
     */
    isObject(val: unknown): val is object {
        if (this.isNil(val)) return false
        // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
        return (typeof val === "object")
    }

    /**
     * Check if input is Object type.
     * @return true if it's object type.
     * @return false if nil.
     */
    isDate(val: unknown): val is Date {
        if (this.isNil(val)) return false
        // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
        if ((val instanceof Date)) return true
        const obj = val as any
        return typeof obj.getMonth === "function"
    }

    /**
     * Check if input is null or undefined.
     * @return true if it's undefined / null.
     */
    isNil(val: unknown): val is null | undefined {
        // https://builtin.com/software-engineering-perspectives/javascript-null-check
        return val === undefined || val === null
    }

    /**
     * Check if input is nil or empty string.
     * @return false if not an empty string.
     * @return true if nil.
     */
    isStrEmpty(val: unknown): val is null | undefined {
        if (this.isNil(val)) return true
        return val?.toString().trim().length === 0

    }

    /**
     * Check if array is nil or empty.
     * @returns true if input is an array.
     * @returns true if nil.
     * @error if input is not an array.
     */
    isArrEmpty(arr: unknown): arr is null | undefined {
        if (this.isNil(arr)) return true
        if (!Array.isArray(arr)) throw Error("@arr is not an array")
        return arr.length === 0

    }

    // /**
    //  * Convert date to unix timestamp milliseconds.
    //  * @error if input is nil.
    //  * @error thrown input is not Date type.
    //  */
    // dateToTimestamp(date: Date): number {
    //
    //     if (this.isNil(date)) throw Error("@date is is nil")
    //     if (!this.isDate(date)) throw Error("@date is not a date")
    //
    //     // https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
    //
    //     return Math.floor(date.getTime())
    // }
    //
    // /**
    //  * Convert unix timestamp in milliseconds to Date.
    //  * @error if timestamp is nil.
    //  * @error if timestamp is not Number type.
    //  */
    // timestampToDate(timestamp: number): Date {
    //
    //     if (this.isNil(timestamp)) throw Error("@timestamp is is nil")
    //     if (!this.isNumber(timestamp)) throw Error("@timestamp is not a date")
    //
    //     // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    //
    //     // Create a new JavaScript Date object based on the timestamp
    //     // multiplied by 1000 so that the argument is in milliseconds, not seconds
    //     return new Date(timestamp)
    // }
    //
    // /**
    //  * @returns  UTC Date now.
    //  */
    // utcNow(): Date {
    //     return dayjs.utc().toDate()
    // }
    //
    // /**
    //  * @returns timestamp UTC now in milliseconds.
    //  */
    // timestampUtcNow(): number {
    //     return this.dateToTimestamp(this.utcNow())
    // }

    /**
     * @returns empty string if input is null
     * @returns the input
     */
    toNullString(val?: string | null | undefined): string {
        if (util.isStrEmpty(val)) return ""
        return val as string
    }

    mapSetJsonStringify(map: Map<string, any>): string {

        // https://www.youtube.com/watch?v=hubQQ3F337A

        return JSON.stringify(map, (_, value) => {

            if (value instanceof Map) {
                return Object.fromEntries(value)
            }

            if (value instanceof Set) {
                return Array.from(value)
            }

            return value
        }, 2)
    }

    mapSetJsonParse(json: string): Map<string, any> | Set<any> {

        // https://www.youtube.com/watch?v=hubQQ3F337A

        return JSON.parse(json, (_, value) => {

            if (Array.isArray(value)) {
                return new Set<any>(value)
            }

            if (value && typeof value === "object") {
                return new Map(Object.entries(value))
            }

            return value
        })
    }

    /**
     * Convert string "YYYYMMDD" to Date without time
     * @param val "YYYYMMDD"
     */
    strToDate(val: string): Date {
        if (this.isNil(val)) return appSettings.defaultDate
        return new Date()
    }

    /**
     * Date without time equality comparison
     */
    dateEqual(date1: Date, date2: Date): boolean {
        // https://stackoverflow.com/questions/1090815/how-to-clone-a-date-object
        const clone1 = new Date(date1.getTime())
        const clone2 = new Date(date2.getTime())

        clone1.setHours(0, 0, 0, 0)
        clone2.setHours(0, 0, 0, 0)
        // https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
        return clone1.getTime() === clone2.getTime()
    }

    delay(ms: number): Promise<void> {
        // https://stackoverflow.com/questions/37764665/how-to-implement-sleep-function-in-typescript
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    genId(): string {
        return uuidv4()
    }
}

export const util = new Util()

if (import.meta.vitest) {
    const { describe, expect, test, vi } = import.meta.vitest

    describe("# util.ts", () => {
        const test1 = ".isNil()"
        test.concurrent(test1, async () => {
            console.time(test1)

            expect(util.isNil(undefined)).toBeTruthy()
            expect(util.isNil(null)).toBeTruthy()

            expect(util.isNil({})).toBeFalsy()
            expect(util.isNil(false)).toBeFalsy()
            expect(util.isNil(true)).toBeFalsy()
            expect(util.isNil("")).toBeFalsy()
            expect(util.isNil(0)).toBeFalsy()

            console.timeEnd(test1)
        })

        const test2 = ".isStrEmpty()"
        test.concurrent(test2, async () => {
            console.time(test2)

            const str: string = ""
            expect(util.isStrEmpty(str)).toBeTruthy()
            expect(util.isStrEmpty("")).toBeTruthy()
            expect(util.isStrEmpty("  ")).toBeTruthy()
            expect(util.isStrEmpty("     ")).toBeTruthy()
            expect(util.isStrEmpty(undefined)).toBeTruthy()
            expect(util.isStrEmpty(null)).toBeTruthy()

            expect(util.isStrEmpty("a")).toBeFalsy()
            expect(util.isStrEmpty(1)).toBeFalsy()
            expect(util.isStrEmpty(true)).toBeFalsy()

            console.timeEnd(test2)
        })

        const test3 = ".isArrEmpty()"
        test.concurrent(test2, async () => {
            console.time(test3)

            expect(util.isArrEmpty([1, 2, 3])).toBeFalsy()
            expect(util.isArrEmpty(["1", "2", 3])).toBeFalsy()
            expect(util.isArrEmpty(["1", 2, { a: "a" }])).toBeFalsy()

            expect(util.isArrEmpty([])).toBeTruthy()
            expect(util.isArrEmpty(null)).toBeTruthy()
            expect(util.isArrEmpty(undefined)).toBeTruthy()

            // https://stackoverflow.com/questions/74487468/how-to-write-a-unit-test-in-vitest-that-expects-an-error
            expect(() => util.isArrEmpty("")).toThrowError()
            expect(() => util.isArrEmpty(123)).toThrowError()
            expect(() => util.isArrEmpty(true)).toThrowError()

            console.timeEnd(test3)
        })

        const test4 = ".isStr()"
        test.concurrent(test4, async () => {
            console.time(test4)

            expect(util.isStr("")).toBeTruthy()
            expect(util.isStr("abc")).toBeTruthy()
            expect(util.isStr("null")).toBeTruthy()
            expect(util.isStr("undefined")).toBeTruthy()

            expect(util.isStr(null)).toBeFalsy()
            expect(util.isStr(undefined)).toBeFalsy()
            expect(util.isStr(123)).toBeFalsy()
            expect(util.isStr(true)).toBeFalsy()
            expect(util.isStr([])).toBeFalsy()
            expect(util.isStr(new Date())).toBeFalsy()
            expect(util.isStr({ a: 1 })).toBeFalsy()

            console.timeEnd(test4)
        })

        const test5 = ".isNumber()"
        test.concurrent(test5, async () => {
            console.time(test5)

            expect(util.isNumber(123)).toBeTruthy()
            expect(util.isNumber(123.45)).toBeTruthy()

            expect(util.isNumber(null)).toBeFalsy()
            expect(util.isNumber(undefined)).toBeFalsy()
            expect(util.isNumber("123")).toBeFalsy()
            expect(util.isNumber(true)).toBeFalsy()
            expect(util.isNumber([])).toBeFalsy()
            expect(util.isNumber(new Date())).toBeFalsy()
            expect(util.isNumber({ a: 1 })).toBeFalsy()

            console.timeEnd(test5)
        })

        const test6 = ".isBoolean()"
        test.concurrent(test6, async () => {
            console.time(test6)

            expect(util.isBoolean(true)).toBeTruthy()
            expect(util.isBoolean(false)).toBeTruthy()

            expect(util.isBoolean(null)).toBeFalsy()
            expect(util.isBoolean(undefined)).toBeFalsy()
            expect(util.isBoolean(123)).toBeFalsy()
            expect(util.isBoolean("123")).toBeFalsy()
            expect(util.isBoolean([])).toBeFalsy()
            expect(util.isBoolean(new Date())).toBeFalsy()
            expect(util.isBoolean({ a: 1 })).toBeFalsy()

            console.timeEnd(test6)
        })

        const test7 = ".isObject()"
        test.concurrent(test7, async () => {
            console.time(test7)

            expect(util.isObject({})).toBeTruthy()
            expect(util.isObject({ a: 1 })).toBeTruthy()
            expect(util.isObject(new Date())).toBeTruthy()
            expect(util.isObject([])).toBeTruthy()

            expect(util.isObject(null)).toBeFalsy()
            expect(util.isObject(undefined)).toBeFalsy()
            expect(util.isObject(123)).toBeFalsy()
            expect(util.isObject("123")).toBeFalsy()
            expect(util.isObject(true)).toBeFalsy()

            console.timeEnd(test7)
        })

        const test8 = ".isDate()"
        test.concurrent(test8, async () => {
            console.time(test8)

            expect(util.isDate(new Date())).toBeTruthy()

            const now = dayjs()
            expect(util.isDate(now.toDate())).toBeTruthy()

            expect(util.isDate(null)).toBeFalsy()
            expect(util.isDate(undefined)).toBeFalsy()
            expect(util.isDate(123)).toBeFalsy()
            expect(util.isDate("123")).toBeFalsy()
            expect(util.isDate(true)).toBeFalsy()
            expect(util.isDate([])).toBeFalsy()
            expect(util.isDate({ a: 1 })).toBeFalsy()

            console.timeEnd(test8)
        })

        // const test9 = ".dateToTimestamp() <=> .timestampToDate()"
        // test.concurrent(test9, async () => {
        //     console.time(test9)
        //
        //     const now = new Date()
        //
        //     const oriTimestamp = util.dateToTimestamp(now)
        //     expect(oriTimestamp).toBeGreaterThan(0)
        //
        //     const resultDate = util.timestampToDate(oriTimestamp)
        //
        //     // how to compare equality of 2 dates
        //     // https://www.freecodecamp.org/news/javascript-date-comparison-how-to-compare-dates-in-js/
        //
        //     const oriTime = now.getTime()
        //     const resultTime = resultDate.getTime()
        //
        //     expect(oriTime).equal(resultTime)
        //
        //     console.timeEnd(test9)
        // })
        //
        // const test10 = ".timestampNow"
        // test.concurrent(test10, async () => {
        //     console.time(test10)
        //
        //     // create the confirm method spy
        //     const dateToTimestampSpy = vi.spyOn(util, "dateToTimestamp")
        //     const utcNowSpy = vi.spyOn(util, "utcNow")
        //
        //     util.timestampUtcNow()
        //
        //     // we know util.dateToTimestampSpy() will convert Date to unix timestamp correctly
        //     // therefore, check if util.dateToTimestampSpy() & util.utcNow() have been called
        //     expect(utcNowSpy).toHaveBeenCalled()
        //     expect(dateToTimestampSpy).toHaveBeenCalled()
        //
        //     console.timeEnd(test10)
        // })
        //
        // const test11 = ".utcNow"
        // test.concurrent(test11, async () => {
        //     console.time(test11)
        //
        //     const utcNow = util.utcNow()
        //
        //     expect(utcNow).not.toBeNull()
        //     expect(utcNow).not.toBeUndefined()
        //
        //     console.timeEnd(test11)
        // })

        const test12 = ".toNullString"
        test.concurrent(test12, async () => {
            console.time(test12)

            expect(util.toNullString(undefined)).toEqual("")
            expect(util.toNullString(null)).toEqual("")
            expect(util.toNullString("")).toEqual("")
            expect(util.toNullString("123")).toEqual("123")

            console.timeEnd(test12)
        })

        const test13 = ".mapJsonStringify <=> mapJsonParse"
        test.concurrent(test13, async () => {
            console.time(test13)

            const map = new Map()
            map.set("key1", "value1")
            map.set("key2", 123)
            map.set("key3", true)
            map.set("key4", new Date().toDateString())

            const json = util.mapSetJsonStringify(map)
            expect(json.length).toBeGreaterThan(0)

            const parseMap = util.mapSetJsonParse(json) as Map<string, any>
            parseMap.forEach((_, key: string) => {
                expect(map.has(key)).toBeTruthy()
                try {
                    expect(map.get(key)).toEqual(parseMap.get(key))
                } catch (err) {
                    console.error(key, map.get(key))
                }
            })

            console.timeEnd(test13)
        })

        const test14 = ".dateEqual"
        test.concurrent(test14, async () => {
            console.time(test14)

            const now = dayjs()
            const result = util.dateEqual(now.toDate(), new Date())
            expect(result).toBeTruthy()

            console.timeEnd(test14)
        })
    })
}

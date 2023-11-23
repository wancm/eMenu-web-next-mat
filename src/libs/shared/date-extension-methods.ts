import { DateHelper } from "./utils/date.helper"


declare global {
    interface String {

        /**
         * Convert formatted YYY-MM-DD or YYYYMMDD date string to number for arithmetic calculations
         * @return YYYYMMDD
         */
        toDateNumber(): number;

        /**
         * Convert formatted YYY-MM-DD or YYYYMMDD date string to Date
         * @return YYYYMMDD
         */
        toDate(): Date;

        /**
         * Add (x) days
         * @param daysToAdd
         */
        addDays(daysToAdd: number): string;
    }

    interface Number {
        /**
         * Convert YYYYMMDD date number to date format YYYY-MM-DD
         */
        toDateFormat(): string;

        /**
         * Convert YYYYMMDD date number to date
         * Default UTC now
         */
        toDate(): Date;
    }

    interface Date {
        /**
         * Convert Date to number for arithmetic calculations
         * @return YYYYMMDD
         */
        toDateNumber(): number;

        /**
         * Convert a date to date format YYYY-MM-DD.
         */
        toDateFormat(): string;
    }
}

String.prototype.toDateNumber = function (): number {
    if (!this) return 0
    return DateHelper.dateStrToDateNumeric(this as string)
}

String.prototype.toDate = function (): Date {
    if (!this) throw Error("string is null or undefined")
    return DateHelper.dateStrToDate(this as string)
}

String.prototype.addDays = function (daysToAdd: number): string {
    if (!this) return this
    return DateHelper.dateStrAddDayToDateStr(this as string, daysToAdd)
}

Number.prototype.toDateFormat = function (): string {
    if (!this) return ""
    return DateHelper.dateNumericToDateFormat(this as number)
}

Number.prototype.toDate = function (): Date {
    if (!this) return DateHelper.utcNowToDateStr().toDateNumber().toDate()
    return DateHelper.dateNumericToDate(this as number)
}

Date.prototype.toDateNumber = function (): number {
    if (!this) return 0
    return DateHelper.dateToDateNumeric(this)
}

Date.prototype.toDateFormat = function (): string {
    if (!this) return ""
    const dateNumeric = DateHelper.dateToDateNumeric(this)
    return DateHelper.dateNumericToDateFormat(dateNumeric)
}

export const dateExtensionMethods = {}

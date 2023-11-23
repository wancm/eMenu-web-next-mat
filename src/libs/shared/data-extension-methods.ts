import { ObjectId } from "mongodb"
import { util } from "@/libs/shared/utils/util"
import { mongodbUtil } from "@/libs/server/data/mongodb/mongodb-util"

declare global {
    interface String {
        toObjectId(): ObjectId;
    }
}

String.prototype.toObjectId = function (): ObjectId {
    if (util.isStrEmpty(this)) return undefined as any
    return mongodbUtil.genId(this.toString())
}

if (import.meta.vitest) {
    const { describe, expect, test, vi } = import.meta.vitest

    describe("# extension.ts", () => {

        const test5 = ".toObjectId()"
        test.concurrent(test5, async () => {
            console.time(test5)

            const objId = new ObjectId()

            const objId2 = objId.toHexString().toObjectId()

            expect(objId).toEqual(objId2)

            console.timeEnd(test5)
        })
    })
}
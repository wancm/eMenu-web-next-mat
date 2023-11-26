"use client"

import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import { Dictionary } from "@/libs/shared/types/dictionary"
import { DictionaryHandler } from "@/libs/server/logic/dictionary/dictionary.handler"

// https://github.com/react-hook-form/devtools/issues/187
const DevT: React.ElementType = dynamic(
    () => import("@hookform/devtools").then((module) => module.DevTool),
    { ssr: false }
)


type FormValues = {
    name: string;
    location: string;
}


export default function QuickStartForm({ dictionary }: { dictionary: Dictionary | undefined }) {

    const dictHandler = new DictionaryHandler(dictionary)
    const fcName = dictHandler.getContent("f-home-name")
    const fcLocation = dictHandler.getContent("f-home-location")

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            location: "",
        }
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) => {
        console.log("Form Submitted.", data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">{fcName?.content}</label>
                    <input type="text" id="name" {...register("name", {
                        required: fcName?.errors?.required
                    })} />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>

                <div>
                    <label htmlFor="location">{fcLocation?.content}</label>
                    <input type="text" id="location" {...register("location", {
                        validate: {
                            tooFar: (fieldValue: string) => {
                                return true
                                //return "location is too far"
                            },
                            tooNear: (fieldValue: string) => {
                                return true
                                //return "location is too near"
                            },
                            aha: (fieldValue: string) => {
                                return true
                            }
                        }
                    })} />
                    <p style={{ color: "red" }}>{errors.location?.message}</p>
                </div>

                <button type={"submit"}>Submit</button>
            </form>

            <DevT control={control} placement="top-left"/>
        </>
    )
}
"use client"

import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import { Dictionary } from "@/libs/shared/types/dictionary"
import { DictionaryHandler } from "@/libs/server/logic/dictionary/dictionary.handler"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { createDraftBusinessUnit } from "@/app/ui/home/actions"

// https://github.com/react-hook-form/devtools/issues/187
const DevT: React.ElementType = dynamic(
    () => import("@hookform/devtools").then((module) => module.DevTool),
    { ssr: false }
)


type FormValues = {
    fcRestaurantName: string;
    fcRestaurantLocation: string;
}


export default function QuickStartForm({ dictionary }: { dictionary: Dictionary | undefined }) {

    const fcName = new DictionaryHandler(dictionary, "f-restaurant-name")
    const fcLocation = new DictionaryHandler(dictionary, "f-restaurant-location")
    const btnQuickTry = new DictionaryHandler(dictionary, "p-home-btn-quick-try")
    const btnLearnMore = new DictionaryHandler(dictionary, "p-home-btn-learn-more")

    const form = useForm<FormValues>({
        defaultValues: {
            fcRestaurantName: "",
            fcRestaurantLocation: "",
        }
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) => {
        console.log("Form Submitted.", data)
    }

    const handleImageChange = (event: any) => {
        console.log("handleImageChange", event)
    }

    return (
        <>
            <form action={createDraftBusinessUnit}>
                <div>
                    <Typography variant="subtitle2" align="center" color="textSecondary" paragraph>
                        {fcName?.label}
                    </Typography>
                    <TextField id="fcRestaurantName" label={fcName?.form?.placeholder}
                               variant="standard" {...register("fcRestaurantName", {
                        required: fcName?.form?.errors?.required
                    })}/>
                    <p style={{ color: "red" }}>{errors.fcRestaurantName?.message}</p>
                </div>

                <div>
                    <Typography variant="body1" align="center" color="textPrimary" gutterBottom>
                        {fcLocation?.label}
                    </Typography>
                    <TextField id="fcRestaurantLocation" label={fcLocation?.form?.placeholder}
                               variant="standard" {...register("fcRestaurantLocation", {
                        required: fcLocation?.form?.errors?.required
                    })}/>
                    <p style={{ color: "red" }}>{errors.fcRestaurantLocation?.message}</p>
                </div>

                <div style={{ marginTop: "40px" }}>
                    <label>
                        upload image
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <div style={{ marginTop: "40px" }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button type={"submit"} variant="contained" color="primary">
                                {btnQuickTry?.label}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">
                                {btnLearnMore?.label}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>

            <DevT control={control} placement="top-left"/>
        </>
    )
}
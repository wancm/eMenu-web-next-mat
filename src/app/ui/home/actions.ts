"use server"

import { DictionaryHandler } from "@/libs/server/logic/dictionary/dictionary.handler"
import { factory } from "@/libs/server/factory"

export async function createDraftBusinessUnit(formData: FormData) {

    const dictionary = await factory.dictionaryService().loadDictionaryAsync()
    const fcName = new DictionaryHandler(dictionary, "f-restaurant-name")
    const fcLocation = new DictionaryHandler(dictionary, "f-restaurant-location")

    console.log(fcName.form?.formControlName, formData.get(fcName.form?.formControlName ?? ""))
    console.log(fcLocation.form?.formControlName, formData.get(fcLocation.form?.formControlName ?? ""))
}
import { Country } from "@/libs/shared/types/country"
import { AppSettings } from "@/libs/server/types/app-settings"

export type MasterDataRepository = {
    loadAppSettingsAsync(): Promise<AppSettings>

    loadCountriesAsync(): Promise<Country[]>

    saveCountriesAsync(countries: Country[]): Promise<string>
}
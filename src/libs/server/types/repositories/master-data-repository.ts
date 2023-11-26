import { Country } from "@/libs/shared/types/country"
import { AppSettings } from "@/libs/server/types/app-settings"

export type MasterDataRepository = {
    getAppSettingsAsync(): Promise<AppSettings>

    getCountriesAsync(): Promise<Country[]>

    saveCountriesAsync(countries: Country[]): Promise<string>
}
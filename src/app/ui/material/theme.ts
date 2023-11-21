import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import { Roboto } from "next/font/google"
import { Theme } from "@mui/material"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
})

// Create a theme instance.
const theme: Theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
})

export default theme
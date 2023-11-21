import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/app/ui/material/theme-registry"
import React from "react"
import { CssBaseline } from "@mui/material"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    creator: "onecm studio",
    title: "e-Menu",
    description: "We make running small restaurant easy for you.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <ThemeRegistry>
            {/*<body className={inter.className}>{children}</body>*/}
            <body>
            <CssBaseline></CssBaseline>
            {children}
            </body>
        </ThemeRegistry>
        </html>
    )
}

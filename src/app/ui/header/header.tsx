import { AppBar, Toolbar, Typography } from "@mui/material"
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone"

export default async function Header() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <LocalDiningTwoToneIcon sx={{ marginRight: "20px" }}></LocalDiningTwoToneIcon>
                <Typography variant="h6">e-Menu</Typography>
            </Toolbar>
        </AppBar>
    )
}
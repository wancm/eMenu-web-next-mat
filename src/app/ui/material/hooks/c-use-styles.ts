// https://stackoverflow.com/questions/69329179/react-typescript-material-ui-usestyles-not-callable

import { makeStyles, Theme } from "@mui/material"

const styles = (theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        }
    }
}

type StyleType = typeof styles

const cUseStyles: StyleType = makeStyles((theme: Theme) => (styles(theme)))

export default cUseStyles
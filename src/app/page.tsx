import { Button, Container, Grid, Typography } from "@mui/material"
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone"
import Form from "./ui/home/quick-start-form"

import Header from "./ui/header/header"
import Footer from "./ui/footer/footer"

const retrieveData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/3")
    return await response.json()
}

export default async function Home() {

    // the data will be included in the first 'document', you could inspect this from the debugger
    const data = await retrieveData()

    return (
        <>
            {/*<main>hello world</main>*/}
            <Header></Header>
            <main>
                <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <div
                            style={{ display: "inline-flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
                            <LocalDiningTwoToneIcon
                                sx={{ marginRight: "40px", fontSize: "60px" }}></LocalDiningTwoToneIcon>
                            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                                e-Menu
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        We make running small restaurant easy for you.
                    </Typography>
                    <div>
                        <Form data={data}></Form>
                    </div>
                    <div style={{ marginTop: "40px" }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    See my photos
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    Secondary actions
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </main>
            <Footer></Footer>
        </>
    )
}
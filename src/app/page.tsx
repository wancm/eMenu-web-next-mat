import { Container, Typography } from "@mui/material"
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone"
import Form from "./ui/home/quick-start-form"
import Header from "./ui/header/header"
import Footer from "./ui/footer/footer"
import { factory } from "@/libs/server/factory"
import { DictionaryHandler } from "@/libs/server/logic/dictionary/dictionary.handler"

export default async function Home() {
    
    // the data will be included in the first 'document' on the site landing page (/), you could inspect this from the debugger
    const dictionary = await factory.dictionaryService().loadDictionaryAsync()

    const lblTitle = new DictionaryHandler(dictionary, "p-home-title")
    const lblHeader = new DictionaryHandler(dictionary, "p-home-header")

    return (
        <>
            {/*<main>site-profile world</main>*/}
            <Header></Header>
            <main>
                <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "baseline"
                            }}>
                            <LocalDiningTwoToneIcon
                                sx={{ marginRight: "40px", fontSize: "60px" }}></LocalDiningTwoToneIcon>
                            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                                {lblTitle?.label}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {lblHeader?.label}
                    </Typography>
                    <div>
                        <Form dictionary={dictionary}></Form>
                    </div>
                </Container>
            </main>
            <Footer></Footer>
        </>
    )
}
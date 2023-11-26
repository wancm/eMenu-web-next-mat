import { Container, Typography } from "@mui/material"
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone"
import Form from "./ui/home/quick-start-form"

import Header from "./ui/header/header"
import Footer from "./ui/footer/footer"
import { factory } from "@/libs/server/factory"
import { DictionaryHandler } from "@/libs/server/logic/dictionary/dictionary.handler"

export default async function Home() {

    const client = factory.clientInfoService().get()

    // the data will be included in the first 'document' on the site landing page (/), you could inspect this from the debugger
    const dictionary = await factory.dictionaryService().loadDictionaryAsync(undefined, client?.countryCode, client?.preferredLanguages)

    const dictHandler = new DictionaryHandler(dictionary)
    const lblTitle = dictHandler.getContent("p-home-title")
    const lblHeader = dictHandler.getContent("p-home-header")

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
                                {lblTitle?.content}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {lblHeader?.content}
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
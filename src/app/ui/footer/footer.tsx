import { Container, Typography } from "@mui/material"

export default async function Footer() {
    return (
        <footer className="footer">
            <Container maxWidth="sm">
                <Typography gutterBottom variant="h6" align="center">
                    Footer
                </Typography>
                <Typography gutterBottom variant="subtitle1" align="center" color="textSecondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias aperiam blanditiis cumque
                    doloribus dolorum exercitationem expedita, ipsum iusto laboriosam minus nam perferendis porro
                    provident, quam quisquam rem sunt vitae!
                </Typography>
            </Container>
        </footer>
    )
}
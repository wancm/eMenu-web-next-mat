export default function Page() {
    return <div>Hello Material</div>
}

// import Image from "next/image"
// import {
//     AppBar,
//     Button,
//     Card, CardActions,
//     CardContent,
//     CardMedia,
//     Container,
//     CssBaseline,
//     Grid,
//     Toolbar,
//     Typography
// } from "@mui/material"
// import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone"
//
//
// // https://www.youtube.com/watch?v=Xoz31I1FuiY
// const classes = {
//     cardGrid: {
//         padding: "20px 0"
//     },
//     card: {
//         height: "100%",
//         display: "flex",
//         flexDirection: "column"
//     },
//     cardMedia: {
//         paddingTop: "56.25%" // 16:9 aspect ratio
//     },
//     cardContent: {
//         flexGrow: 1
//     },
//     footer: {
//         // backgroundColor: theme.palette.backgroundColor.paper
//         padding: "50px 0"
//     }
// }
//
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//
// export default function Home() {
//     return (
//         <>
//             <CssBaseline></CssBaseline>
//             <AppBar position="relative">
//                 <Toolbar>
//                     <LocalDiningTwoToneIcon sx={{ marginRight: "20px" }}></LocalDiningTwoToneIcon>
//                     <Typography variant="h6">e-Menu</Typography>
//                 </Toolbar>
//             </AppBar>
//             <main>
//                 <Container maxWidth="sm" sx={{ marginTop: "100px", }}>
//                     <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
//                         eFeed
//                     </Typography>
//                     <Typography variant="h5" align="center" color="textSecondary" paragraph>
//                         We make running small restaurant easy for you.
//                     </Typography>
//                     <div style={{ marginTop: "40px" }}>
//                         <Grid container spacing={2} justifyContent="center">
//                             <Grid item>
//                                 <Button variant="contained" color="primary">
//                                     See my photos
//                                 </Button>
//                             </Grid>
//                             <Grid item>
//                                 <Button variant="outlined" color="primary">
//                                     Secondary actions
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </div>
//                 </Container>
//                 <Container maxWidth="md" sx={classes.cardGrid}>
//                     <Grid container spacing={4}>
//                         {cards.map((card) =>
//                             <Grid item key={card} xs={12} sm={6} md={4}>
//                                 <Card sx={classes.card}>
//                                     <CardMedia sx={classes.cardMedia}
//                                                image="https://source.unsplash.com/random"
//                                                title="Image title">
//                                     </CardMedia>
//                                     <CardContent sx={classes.cardContent}>
//                                         <Typography gutterBottom variant="h5">
//                                             Heading
//                                         </Typography>
//                                         <Typography gutterBottom variant="h5">
//                                             This is a media. You can use this section to describe the content.
//                                             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis
//                                             corporis
//                                             delectus deleniti, eius exercitationem illum incidunt laudantium maiores
//                                             minus
//                                             natus provident quod quos sunt temporibus, ullam vitae, voluptate
//                                             voluptatem.
//                                         </Typography>
//                                     </CardContent>
//                                     <CardActions>
//                                         <Button size="small" color="primary">View</Button>
//                                         <Button size="small" color="primary">Edit</Button>
//                                     </CardActions>
//                                 </Card>
//                             </Grid>
//                         )}
//                     </Grid>
//                 </Container>
//             </main>
//             {/*<footer className={classes.footer}>*/}
//             <footer>
//                 <Container maxWidth="sm">
//                     <Typography gutterBottom variant="h6" align="center">
//                         Footer
//                     </Typography>
//                     <Typography gutterBottom variant="subtitle1" align="center" color="textSecondary">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias aperiam blanditiis cumque
//                         doloribus dolorum exercitationem expedita, ipsum iusto laboriosam minus nam perferendis porro
//                         provident, quam quisquam rem sunt vitae!
//                     </Typography>
//                 </Container>
//             </footer>
//         </>
//     )
// }
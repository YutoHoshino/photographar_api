import { Container, Grid, makeStyles } from "@material-ui/core"

// material css
const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  }
}))

export const LoadLayout = ({children}:any) => {
  
  const classes = useStyles()

  return (
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justifyContent="center">
          <Grid item>
            {children}
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}
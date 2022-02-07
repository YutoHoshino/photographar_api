import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(
  {
      toolbar: {
          minHeight: `40px`,
      }
  }
);



export const AuthHeader = () => {

  const classes = useStyles();

  return (
    <AppBar 
      position="static"
      elevation={0}

    >
      <Toolbar
        className={classes.toolbar}
      >
      <IconButton
        color="inherit"
      >
        Photographar
      </IconButton>
      </Toolbar>
    </AppBar>
  )
}
import { useContext } from "react";

// material
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from "@material-ui/core"

import Icon from '@mdi/react'
import { mdiImagePlus, mdiAccountCircle } from '@mdi/js'


// useContext
import { AuthContext } from "App";
import { Link, useHistory } from "react-router-dom";

// apis
import { signOut } from "apis/auth";

const useStyles = makeStyles(
  {
    toolbar: {
        minHeight: `50px`,
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: "inherit"
    }
  }
);

export const PrimaryHeader = () => {

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const classes = useStyles();

  const history = useHistory();

  // ログアウト
  const handleSignOut = (e: any)  => {
    e.preventDefault()

    signOut()
    .then(data => {
      setIsSignedIn(false)
      setCurrentUser(undefined)
      history.push("/signin")
    })
  }

  

  return (
    <AppBar 
      position="static"
      elevation={0}
    >
      <Toolbar
        className={classes.toolbar}
      >

        <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            photographar
        </Typography>

        <>
          <Button
            color="inherit"
          >
            <Icon path={mdiImagePlus} size={1.3}/>
          </Button>
          <Button
            color="inherit"
          >
            <Icon path={mdiAccountCircle} size={1.3}/>
          </Button>

          <Button
            color="inherit"
            onClick={handleSignOut}
          >
            ログアウト
          </Button>
        </>


      </Toolbar>
    </AppBar>
  )
}
import { useContext } from "react";

// material
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

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

  const { isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext)

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

         {/* ロゴ */}
        <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            photographar
        </Typography>


         {/* ログイン&ログアウトボタン */}
        {
          isSignedIn ? (
            <Button
              color="inherit"
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              component={Link}
              to="/signin"
              color="inherit"
            >
              ログイン
            </Button>
          ) 
        }

      </Toolbar>
    </AppBar>
  )
}
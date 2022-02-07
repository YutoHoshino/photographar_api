import { useContext, useState } from "react";

// material
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from "@material-ui/core"

import Icon from '@mdi/react'
import { mdiImagePlus, mdiAccountCircle } from '@mdi/js'


// useContext
import { AuthContext } from "App";
import { Link, useHistory } from "react-router-dom";

// apis
import { signOut } from "apis/auth";
import { PostModal } from "components/Modal/PostModal";

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

  const [isOpen, setIsOpen] = useState<boolean>(false)


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

  // 投稿モーダル表示
  const handlePost = (e: any) => {
    e.preventDefault()
    setIsOpen(true)
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
          {/* 投稿 */}
          <Button
            color="inherit"
            onClick={handlePost}
          >
            <Icon path={mdiImagePlus} size={1.3}/>
          </Button>


          {/* ユーザーアイコン */}
          <Button
            color="inherit"
          >
            <Icon path={mdiAccountCircle} size={1.3}/>
          </Button>

          {/* ログアウト */}
          <Button
            color="inherit"
            onClick={handleSignOut}
          >
            ログアウト
          </Button>
        </>

        {
          <PostModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        }


      </Toolbar>
    </AppBar>
  )
}
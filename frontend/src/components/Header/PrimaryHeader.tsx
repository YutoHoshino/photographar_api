import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// material
import { Avatar, AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from "@material-ui/core"

import Icon from '@mdi/react'
import { mdiImagePlus, mdiAccountCircle } from '@mdi/js'

// useContext
import { AuthContext } from "App";

// apis
import { PostModal } from "components/Modal/PostModal";

// containers
import { SignOut } from "containers/SignOut";

// compornent
import { UserModal } from "components/Modal/UserModal";

// material css
const useStyles = makeStyles(
  {
    appBar: {
      boxShadow: 'none',
      borderBottom: "solid 1px #dbdbdb"
    },
    toolbar: {
        minHeight: `60px`,
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: "inherit"
    }
  }
);

export const PrimaryHeader = () => {

  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const classes = useStyles();

  const history = useHistory();

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // PostMenuモーダル表示
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  }


  // ログアウト
  const handleSignOut = (e: any)  => {
    e.preventDefault()
    SignOut()
    .then(res => {
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
    <>
      {
        currentUser ? 
        <>
          <AppBar 
          color="primary"
          className={classes.appBar}
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
                <IconButton
                  onClick={handleMobileMenuOpen} 
                >
                  <Avatar
                    alt={currentUser.name}
                    src={currentUser.image?.url}
                  />
                </IconButton>
      
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

          <UserModal
            isPostModal={isPostModal}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />

        </>
      :
        <></>
      }
    </>
  )
}
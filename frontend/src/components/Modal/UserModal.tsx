import { useContext } from "react"
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { MenuItem, makeStyles } from "@material-ui/core"
import Menu from '@mui/material/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//useContext
import { AuthContext } from "App";

// apis
import { signOut } from "apis/auth";


// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
  setAnchorEl: any,
}

const SMenuItem = styled(MenuItem)`
  color: red;
`

export const UserModal = (props: Props) => {

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const history = useHistory();

  // ログアウト
  const handleSignOut = (e: any)  => {
    e.preventDefault()
    signOut()
    .then(res => {
      setIsSignedIn(false)
      setCurrentUser(undefined)
      history.push("/signin")
    })
  }

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isPostModal}
      onClose={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <AccountCircleIcon/>
        <p>プロフィール</p>
      </MenuItem>

      <MenuItem>
        <FavoriteIcon/>
        <p>いいね</p>
      </MenuItem>

      <MenuItem>
        <SettingsIcon/>
        <p>設定</p>
      </MenuItem>

      <SMenuItem 
        onClick={handleSignOut}
      >
        <ExitToAppIcon/>
        <p>ログアウト</p>
      </SMenuItem>

    </Menu>
  )
}
import { useContext } from "react"
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { MenuItem, makeStyles } from "@material-ui/core"
import Menu from '@mui/material/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@mui/icons-material/Mail';

//useContext
import { AuthContext } from "App";

// hooks
import { UseSignOut } from "hooks/useSignOut";


// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
  setAnchorEl: any,
}

const RedMenuItem = styled(MenuItem)`
  color: red;
`

export const UserModal = (props: Props) => {

  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const history = useHistory();

  // ログアウト
  const handleSignOut = (e: any)  => {
    e.preventDefault()
    UseSignOut()
    .then(res => {
      setIsSignedIn(false)
      setCurrentUser(undefined)
      history.push("/signin")
    })
  }

  // ユーザープロフィール移動
  const handleProfile = () => {
    history.push(`/user/${currentUser?.name}`)
  }

  // ユーザー編集移動
  const handleUserEdit = () => {
    history.push(`/user/${currentUser?.name}/edit`)
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
      <MenuItem
        onClick={handleProfile}
      >
        <AccountCircleIcon/>
        <p>プロフィール</p>
      </MenuItem>

      <MenuItem>
        <MailIcon/>
        <p>メッセージ</p>
      </MenuItem>

      <MenuItem
        onClick={handleUserEdit}
      >
        <SettingsIcon/>
        <p>設定</p>
      </MenuItem>

      <RedMenuItem 
        onClick={handleSignOut}
      >
        <ExitToAppIcon/>
        <p>ログアウト</p>
      </RedMenuItem>

    </Menu>
  )
}
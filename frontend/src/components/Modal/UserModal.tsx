import { useContext } from "react"
import { MenuItem, makeStyles } from "@material-ui/core"

import Menu from '@mui/material/Menu';
import styled from "styled-components";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      <SMenuItem>
        <ExitToAppIcon/>
        <p>ログアウト</p>
      </SMenuItem>
    </Menu>
  )
}
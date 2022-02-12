import { Badge, Dialog, IconButton, makeStyles, Menu, MenuItem, Theme } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons";
import { mdiArrowRightBoldCircleOutline } from "@mdi/js"

// material style CSS
const useStyles = makeStyles((theme: Theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
}

export const PostActionModal = (props: Props) => {

  const classes = useStyles();

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isPostModal}
      onClose={props.onClose}
      keepMounted
    >
      <MenuItem>
        <p>修正</p>
      </MenuItem>
      <MenuItem>
        <p>削除</p>
      </MenuItem>
      <MenuItem>
        <p>キャンセル</p>
      </MenuItem>
    </Menu>
  )
}
import { useContext } from "react"
import { MenuItem } from "@material-ui/core"

import Menu from '@mui/material/Menu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//apis
import { postDelete } from "apis/post"

// container
import { PostContext } from "containers/Post"

// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
  postId: Number | null
  setAnchorEl: any,
}

export const PostActionModal = (props: Props) => {

  const { setIsPost } = useContext(PostContext)

  // 投稿編集
  const handleEdit = (e: React.SyntheticEvent) => {
  }

  // 投稿削除
  const handleDelete = (e: React.SyntheticEvent) => {
    const params = {id: props.postId}
    postDelete(params)
    .then((res) => {
      props.setAnchorEl(null)
      setIsPost(true)
    })
  }


  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isPostModal}
      onClose={props.onClose}
    >
      <MenuItem
        onClick={handleEdit}>
        <EditIcon/>
        <p>修正</p>
      </MenuItem>

      <MenuItem 
        onClick={handleDelete}>
        <DeleteIcon/>
        <p>削除</p>
      </MenuItem>
    </Menu>
  )
}
import { useContext } from "react"
import { useHistory } from "react-router";
import styled from "styled-components";

import { MenuItem } from "@material-ui/core"
import Menu from '@mui/material/Menu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//apis
import { postDelete } from "apis/post"

// useContext
import { PostContext } from "App";

//style css
const SMenuItem = styled(MenuItem)`
  color: red;
`

// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
  postId: Number | null
  setAnchorEl: any,
}

export const PostActionModal = (props: Props) => {

  const history = useHistory();

  const { setIsPosted } = useContext(PostContext)

  // 投稿編集
  const handleEdit = (e: React.SyntheticEvent) => {
    const id = props.postId
    console.log(id)
    history.push(`/post/${id}`)
  }

  // 投稿削除
  const handleDelete = (e: React.SyntheticEvent) => {
    const params = {id: props.postId}
    postDelete(params)
    .then((res) => {
      props.setAnchorEl(null)
      setIsPosted(true)
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

      <SMenuItem 
        onClick={handleDelete}>
        <DeleteIcon/>
        <p>削除</p>
      </SMenuItem>
    </Menu>
  )
}
import { Menu, MenuItem } from "@material-ui/core"

// interface
interface Props {
  isPostModal: boolean,
  onClose: () => void,
  anchorEl: any,
  postId: Number | null
}



export const PostActionModal = (props: Props) => {

  // 投稿編集
  const handleEdit = (e: React.SyntheticEvent) => {
    console.log("編集")
    console.log(props.postId)
  }

  // 投稿削除
  const handleDelete = (e: React.SyntheticEvent) => {
    console.log("削除")
    console.log(props.postId)
  }


  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isPostModal}
      onClose={props.onClose}
    >
      <MenuItem
        onClick={handleEdit}>
        <p>修正</p>
      </MenuItem>

      <MenuItem 
        onClick={handleDelete}>
        <p>削除</p>
      </MenuItem>

      <MenuItem
        onClick={props.onClose}
      >
        <p>キャンセル</p>
      </MenuItem>

    </Menu>
  )
}
import { CardActions, IconButton } from "@material-ui/core"

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"

// containers
import { handleLikes } from "containers/Like";

// interface
import { GetPostdata } from "interfaces";

interface Props {
  likeCount: number
  postdata: GetPostdata
}

export const PostCardAction = (props: Props) => {

  let { likeCount } = props

  const { postdata } = props 

  return (
    <CardActions disableSpacing>

      <IconButton
        onClick={(e) => {
          likeCount = handleLikes(
            {
              postId: postdata.post.id, 
              likesCount: likeCount,
              e:e,
            }
          )
        }}
      >
        <FavoriteIcon/>
      </IconButton>
      
      <IconButton
        onClick={() => {
          const url = `${window.location.href}post/` + `${postdata.post.id}`
          navigator.clipboard.writeText(url)
          alert("クリップボードにコピーされました!!")
        }}
      >
        <ShareIcon/>
      </IconButton>

    </CardActions>
  )
}
import { CardActions, IconButton } from "@material-ui/core"

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"

// hooks
import { UseLike } from "hooks/useLike"

// interface
import { PostData } from "interfaces/data/PostData";
import { User } from "interfaces/get/User";

interface Props {
  likeCount: number
  postdata: PostData
  currentUser: User
}

export const PostCardAction = (props: Props) => {

  let { likeCount } = props

  const { postdata, currentUser } = props 

  return (
    <CardActions disableSpacing>

      <IconButton
        onClick={(e) => {
          likeCount = UseLike(
            {
              postId: postdata.post.id, 
              likesCount: likeCount,
              e:e,
            }
          )
        }}
      >
        <FavoriteIcon id={postdata.likes.some((like)=>like.user_id == currentUser?.id) ? "liked" : ""}/>
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
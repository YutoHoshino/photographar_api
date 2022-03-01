import { CardActions, IconButton } from "@material-ui/core"

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"

// hooks
import { UseLike } from "hooks/useLike"

// interface
import { PostData } from "interfaces/data/PostData";

interface Props {
  likeCount: number
  postdata: PostData
}

export const PostCardAction = (props: Props) => {

  let { likeCount } = props

  const { postdata } = props 

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
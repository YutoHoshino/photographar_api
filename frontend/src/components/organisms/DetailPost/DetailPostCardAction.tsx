import styled from "styled-components";

import Grid from '@material-ui/core/Grid';
import { IconButton } from "@material-ui/core";

// icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"

// hooks
import { UseLike } from "hooks/useLike";

// interface
import { PostData } from "interfaces/Posts";
import { User } from "interfaces/get/User";

const CardAction = styled(Grid)`
  border-top: solid 1px #efefef;
  padding: 16px;
`

interface Props {
  PostData: PostData
  likeCount: number | undefined
  currentUser: User
}

export const DetailPostCardAction = (props: Props) => {

  let   { likeCount }         = props
  const { PostData, currentUser } = props

  return (
    <CardAction

    >
      <IconButton
        onClick={(e) => {
          likeCount = UseLike(
            {
              postId: PostData.post.id,
              likesCount: likeCount || 0,
              e:e
            }
          )
        }}
      >
        <FavoriteIcon id={PostData.likes.some((like)=>like.user_id == currentUser?.id) ? "liked" : ""}/>
      </IconButton>

      <IconButton
        onClick={(() => {})}
      >
        <ShareIcon />
      </IconButton>

    </CardAction>
  )
}
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CardActions, IconButton } from "@material-ui/core"

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"

// organisms
import { AlertMessage } from 'components/organisms/Alert/AlertMessage';

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

  // アラート
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  return (
    <>
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
      
      <CopyToClipboard
        text={`${window.location.href}post/` + `${postdata.post.id}`}
        onCopy={e => setAlertMessageOpen(true)}
      >
        <IconButton>
          <ShareIcon/>
        </IconButton>
      </CopyToClipboard>

    </CardActions>

    <AlertMessage
      open={alertMessageOpen}
      setOpen={setAlertMessageOpen}
      severity="success"
      message="リンクがクリップボードにコピーされました。"
    />
  </>
  )
}
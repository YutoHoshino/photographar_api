import styled from "styled-components";

import { Typography } from "@material-ui/core";

// interface
import { PostData } from "interfaces/data/PostData";

const LikeWapper = styled.div`
  padding: 0 16px;
`
const LikeCountText = styled(Typography)`
  font-weight: bold;
`

interface Props {
  postdata: PostData
}

export const PostLikeWapper = (props: Props) => {

  const { postdata } = props 

  return (
    <LikeWapper>
      <LikeCountText
        variant="body2"
        id={`like-count-${postdata.post.id}`} 
      >
        {
          postdata.likes.length == 0 ?
          null
          :
          `${postdata.likes.length}件のいいね`
        }
      </LikeCountText>
    </LikeWapper>
  )
}
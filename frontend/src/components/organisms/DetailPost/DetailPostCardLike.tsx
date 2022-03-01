import styled from "styled-components";

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// interface
import { PostData } from "interfaces/data/PostData";

const LikeCountWapper = styled(Grid)`
  padding: 0 16px;
  height: 70px;
`
const LikeText = styled(Typography)`
  font-weight: bold;
`

interface Props {
  PostData: PostData
}

export const DetailPostCardLike = (props: Props) => {

  const { PostData } = props 

  return (
    <LikeCountWapper>
      <LikeText  id={`like-count-${PostData.post.id}`}>
        {
          PostData.likes.length == 0 ? 
          null 
          :  
          `${PostData.likes.length}件のいいね`
        }
      </LikeText>
    </LikeCountWapper>
  )
}
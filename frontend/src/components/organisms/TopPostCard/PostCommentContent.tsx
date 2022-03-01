import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {CardContent, Grid, Typography } from '@material-ui/core';

// interface
import { PostData } from "interfaces/data/PostData";

const CommentAllButton = styled(Typography)`
  color: #8e8e8e;
  font-weight: 500;
  cursor: pointer;
`

interface Props {
  postdata: PostData
}

export const PostCommentContent = (props: Props) => {

  const history = useHistory();

  const {postdata} = props

  return (
    <CardContent>
      <Typography variant="body2">
        <strong>{postdata.user.name}&nbsp;</strong>
        {postdata.post.caption}
      </Typography>

      <Grid id={`comment-${postdata.post.id}`} >
      {
        postdata.comments.length < 5 ? 
        postdata.comments.map((comment:any) => {
          return (
          <Typography variant="body2" key={comment.id}>
            <strong>{comment.user.name}&nbsp;</strong>
            {comment.text}
          </Typography>
          )
        })
        :
        <CommentAllButton 
          variant="body2"
          onClick={() => {history.push(`/post/${postdata.post.id}`)}}
        >
          コメント{postdata.comments.length}件をすべて見る
        </CommentAllButton>
      }
      </Grid>
    </CardContent>
  )
}
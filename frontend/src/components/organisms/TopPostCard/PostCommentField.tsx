import { useState } from "react";
import styled from "styled-components";

import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";

// interface
import { PostData } from "interfaces/Posts";

// containers
import { handleComments } from "containers/Comment";


const CommentWapper = styled(Box)`
  padding: 10px 16px;
  border-top: solid 1px #efefef;
`
const FlexFrom = styled.form`
  display: flex;
`

const useStyles = makeStyles((theme: Theme) => ({
  CommentField: {
    fontSize: "13px",
    whiteSpace: "pre-line",
  },
}))


interface Props {
  postdata: PostData
}

export const PostCommentField = (props :Props) => {

  const { postdata } = props

  const classes = useStyles();

  const [comment, setComment] = useState<String>("")

  return (
    <CommentWapper>
      <FlexFrom>
        
        <TextField
          margin="dense"
          required
          fullWidth
          placeholder='コメントを追加...'
          multiline
          value={comment}
          onChange={e => setComment(e.target.value)}
          InputProps={{
            disableUnderline: true,
            classes: {input: classes.CommentField}
          }}
        />

        <Button
          type="submit"
          variant="text"
          color="primary"
          style={{fontWeight: 'bold'}}
          onClick={(e) => {
            e.preventDefault()
            handleComments(
              {
                comment: comment,
                postId: postdata.post.id,
              }
            )
            setComment("")
          }}
        >
          送信
        </Button>

      </FlexFrom>
    </CommentWapper>
  )
}
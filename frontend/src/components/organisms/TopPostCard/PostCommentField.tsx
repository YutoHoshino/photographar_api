import { useState } from "react";
import styled from "styled-components";

import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";

// interface
import { PostData } from "interfaces/data/PostData";

// hooks
import { UseComments } from "hooks/useComment";
import { AnyAaaaRecord } from "dns";

// organisms
import { AlertMessage } from "components/organisms/Alert/AlertMessage";


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

  const [comment, setComment] = useState<string>("")

  // アラート
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  return (
    <>
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
              UseComments(
                {
                  comment: comment,
                  postId: postdata.post.id,
                  setAlertMessageOpen: setAlertMessageOpen
                }
              )
              setComment("")
            }}
          >
            送信
          </Button>

        </FlexFrom>
      </CommentWapper>

      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message={`${postdata.user.name}さんの投稿にコメントしました`}
      />
    </>
    
  )
}
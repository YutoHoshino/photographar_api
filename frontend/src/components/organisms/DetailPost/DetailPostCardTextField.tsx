import { useState } from "react";
import styled from "styled-components";

import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';

// interface
import { PostData } from 'interfaces/data/PostData';

// hooks
import { UseComment } from "hooks/useComment";

// organisms
import { AlertMessage } from "components/organisms/Alert/AlertMessage";

// style css
const CardComment = styled(Grid)`
  padding: 0 16px;
  border-top: solid 1px #efefef;
`
const CommentForm = styled.form`
  display: flex;
`

interface Props {
  PostData: PostData
  setPostData: any
}

export const DetailPostCardTextField = (props: Props) => {

  const [comment, setComment] = useState<string>("")

  // アラート
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const { PostData, setPostData } = props 

  return (
    <>
      <CardComment>
        <CommentForm>

          <TextField
            margin="dense"
            required
            fullWidth
            placeholder='コメントを追加...'
            multiline
            rows={2}
            value={comment}
            onChange={e => setComment(e.target.value)}
            InputProps={{
              disableUnderline: true,
            }}
          />

          <Button
            type="submit"
            variant="text"
            color="primary"
            style={{fontWeight: 'bold'}}
            onClick={(e) => {
              e.preventDefault()
              setComment("")
              UseComment(
                {
                  comment: comment,
                  postId: PostData.post.id,
                  setPost: setPostData,
                  setAlertMessageOpen: setAlertMessageOpen
                }
              )
            }}
          > 
            送信
          </Button>

        </CommentForm>
      </CardComment>

      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message={`${PostData.user.name}さんの投稿にコメントしました`}
      />
    </>
  )
}
import styled from "styled-components";

import { Box, Button, IconButton, InputBase, makeStyles, TextField, Theme } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import { CreateChat } from "apis/chat";

const FormhWapper = styled(Box)`
  display: flex;
  border-top: 1px solid rgb(207, 217, 222);
  align-items: center;
  padding: 10px 20px;
  font-size: 10px;
`
const MessageField = styled(TextField)`
  padding: 6px 20px 3px;
  border-radius: 2.5em;
  border: 1px solid rgb(207, 217, 222);
`
const SendButton = styled(SendIcon)`
  color: rgb(29,155,240);
`

const useStyles = makeStyles((theme: Theme) => ({
  CommentField: {
    fontSize: "14px",
    whiteSpace: "pre-line",
  },
}))

interface Props {
  setMessage: Function
  Message: string | undefined
  RoomId:  number
  setSendFlag: Function
  SendFlag: boolean
}

export const ChatFeild = (props: Props) => {
  
  const classes = useStyles();

  const { setMessage, Message, RoomId, setSendFlag, SendFlag } = props

  const handleMessage = (e: any) => {
    if (Message == undefined) return
    e.preventDefault()
    setMessage("")
    const params = {
      message: Message,
      room_id: RoomId,
    }
    CreateChat(params)
    .then(() => {
      setSendFlag(!SendFlag)
    })
  }

  return (
    <form>
      <FormhWapper>

        <MessageField
          margin="dense"
          required
          multiline
          fullWidth
          placeholder="新しいメッセージを作成..."
          value={Message}
          onChange={e => setMessage(e.target.value)}
          InputProps={{
            disableUnderline: true,
            classes: {input: classes.CommentField}
          }}
        />

        {
          (Message == undefined) || (Message == "") ?
          <IconButton
            disabled={true}
          > 
            <SendIcon/>
          </IconButton>
          :
          <IconButton
            onClick={e => handleMessage(e)}
          >
            <SendButton/>
          </IconButton>
        }

      </FormhWapper>
    </form>
  )
}
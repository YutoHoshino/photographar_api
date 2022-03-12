import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";

import { Card, Box } from '@material-ui/core';

// useContext
import { AuthContext } from "App"

// template
import { CommonLayout } from "components/templates/CommonLayout"

// organisms
import { ChatMessage } from "components/organisms/Chat/ChatMessage"
import { ChatFeild } from "components/organisms/Chat/ChatFeild";

// apis
import { CreateRoom } from "apis/room";

// interface
import { ChatData } from "interfaces/data/ChatData"

// style css
const ChatCard = styled(Card)`
  box-shadow: none !important;
  border: 1px solid #dbdbdb;
`

export const ChatPage = ({ match }: any) => {

  // 対象のPostID
  const params = { UserId: match.params.userId}

  const { currentUser } = useContext(AuthContext)

  const [ChatData, setChatData] = useState<ChatData>()

  const [Message, setMessage] = useState<string>()

  const [SendFlag, setSendFlag] = useState<boolean>(false)

  const messageBox = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    CreateRoom(params)
    .then((data) => {
      setChatData(data)
      if (messageBox.current) {
        messageBox.current.scrollTop = messageBox.current.scrollHeight + 16;
      }
    })
  },[SendFlag, count])

  return (
    <>
      {
        ChatData ?
        
        <CommonLayout>
          <ChatCard>
            <Box sx={{width: {xs: "350px", md: "500px"}}}>

              <ChatMessage 
                ChatData={ChatData}
                messageBox={messageBox}
              />

              <ChatFeild 
                setMessage={setMessage} 
                Message={Message} 
                RoomId={ChatData.room_id}
                setSendFlag={setSendFlag}
                SendFlag={SendFlag}
              />

            </Box>
          </ChatCard>
        </CommonLayout>
        :
        <></>
      }
    </>
  )
}
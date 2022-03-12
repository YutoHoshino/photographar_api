import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// 時間フォーマット
import moment from 'moment'

// useContext
import { AuthContext } from "App";

import CardContent from '@mui/material/CardContent';
import { Box, CardHeader } from '@material-ui/core';

// atoms
import { UserAveter } from "components/atoms/Avater/UserAvater";

// interface
import { ChatData } from "interfaces/data/ChatData"


// style css
const UserName = styled.div`
  cursor: pointer;
`
const MessageWapper = styled(CardContent)`
  height: 400px;  
  overflow: scroll;
`
const OtheUserWapper = styled(Box)`
  display: flex;
  margin: 10px;
  text-align: left;
`
const CurrentUserWapper = styled(Box)`
  margin: 10px;
  text-align: right;
`
const OtheUserText = styled(Box)`
  margin-left: 10px;
  display: inline-block;
  padding: 8px;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  background-color: rgb(239, 243, 244);
  color: #333;
`
const CurrentUserText= styled(Box)`
  display: inline-block;
  padding: 8px;
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  background-color: rgb(29, 155, 240);
  color: #fff;
`
const OtheUserMessageTime = styled(Box)`
  font-size: 10px;
  margin: 5px 10px;
  text-align: left;
  color: gray;
`
const CurrentUserMessageTime = styled(Box)`
  font-size: 10px;
  margin: 0px 10px;
  text-align: right;
  color: gray;
`

interface Props {
  ChatData: ChatData
  messageBox: any
}

export const ChatMessage = (props: Props) => {

  const history = useHistory();

  const { currentUser } = useContext(AuthContext)

  const { ChatData, messageBox } = props

  return (
    <>
      {
        currentUser ?

        <>
          <CardHeader
            avatar={
              <UserAveter
                userName={ChatData.partner.name}
                ImageSrc={ChatData.partner.image?.url}
                Url={`/user/${ChatData.partner.name}`}
                AvaterSize={40}
              />
            }
            title={
              <UserName
                onClick={() => {history.push(`/user/${ChatData.partner.name}`)}}
              >
                {ChatData.partner.name}
              </UserName>
            }
          />
          <MessageWapper ref={messageBox}>
            {
              ChatData.chats.map((Chat) => 

                <Box key={Chat.id}>
                {
                  Chat.user_id == currentUser.id ?
                  <>
                    <CurrentUserWapper>
                      <CurrentUserText>
                        {Chat.message}
                      </CurrentUserText>
                    </CurrentUserWapper>
                    <CurrentUserMessageTime>
                      {moment(Chat.created_at).format('MM/DD hh:mm')}
                    </CurrentUserMessageTime>
                  </>
                  :
                  <>
                    <OtheUserWapper>
                      <UserAveter
                        userName={ChatData.partner.name}
                        ImageSrc={ChatData.partner.image?.url}
                        Url={`/user/${ChatData.partner.name}`}
                        AvaterSize={30}
                      />
                      <Box>
                        <OtheUserText>
                          {Chat.message}
                        </OtheUserText>
                        <OtheUserMessageTime>
                          {moment(Chat.created_at).format('MM/DD hh:mm')}
                        </OtheUserMessageTime>
                      </Box>
                    </OtheUserWapper>

                  </>
                }
                </Box>
              )
            }

          </MessageWapper>
        </>

        :
        <></>
      }
    </>
  )
}
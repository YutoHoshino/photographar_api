import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// 時間フォーマット
import moment from 'moment'

// apis
import { RoomAll } from 'apis/room';

// interface
import { RoomData } from 'interfaces/data/RoomData';
import { Box, Card, CardHeader, Grid } from '@material-ui/core';

// hooks
import { UseDateComparison } from 'hooks/useDateComparison';

// style css
const ChatCard = styled(Card)`
  box-shadow: none !important;
  border: 1px solid #dbdbdb;
  height: 500px;
  overflow: scroll;
`
const ChatListItem = styled(ListItem)`
  padding-top: 13px !important;
  padding-bottom: 13px !important;
  &:hover {
    cursor: pointer;
    background: rgb(239, 243, 244);
  }
`
const NameAndDateWapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const ItemWapper = styled(Grid)`
  width: 100%;
`
const NameText = styled(Typography)`
  font-size: 13px !important;
`
const DateTime = styled(Typography)`
  font-size: 5px !important;
  color: gray;
`
const LastMessage = styled(Typography)`
  font-size: 12px !important;
  color: gray;
`

export const RoomList = () => {

  const history = useHistory();

  const [ChatRooms, setChatRooms] = useState<Array<RoomData>>()

  useEffect(() => {
    RoomAll()
    .then((data) => {
      setChatRooms(data.rooms)
    })
  },[])

  return (
    <>
      {
        ChatRooms ?
        <ChatCard>
          <Box sx={{width: {xs: "350px", md: "500px"}}}>
            <CardHeader 
              title={
                <Typography color="text.secondary">
                  チャット一覧
                </Typography>
              }/>
          {
            ChatRooms.map((ChatRoom) => 
              <>
              
              <ChatListItem 
                key={ChatRoom.room.id}
                onClick={e => history.push(`/room/${ChatRoom.other_user.id}`)}
              >
          
                <ListItemAvatar>
                  <Avatar 
                    alt={ChatRoom.other_user.name}
                    src={ChatRoom.other_user.image.url} 
                  />
                </ListItemAvatar>

                <ItemWapper>

                  <NameAndDateWapper>

                    <NameText>
                      {ChatRoom.other_user.name}
                    </NameText>

                    <DateTime>
                      {
                        UseDateComparison({ TargetDate: ChatRoom.room.updated_at, ComparisonDate: new Date }) ?
                        moment(ChatRoom.room.updated_at).format('hh:mm')
                        :
                        moment(ChatRoom.room.updated_at).format('MM/DD')
                      }
                    </DateTime>

                  </NameAndDateWapper>

                  <LastMessage>
                    {ChatRoom.last_message}
                  </LastMessage>

                </ItemWapper>

              </ChatListItem>
              </>
            
            )
          }
          </Box>
        </ChatCard>
        
        :
        <></>
      }
    </>

  )
}
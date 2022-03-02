import { useContext, useState } from "react";
import styled from "styled-components";

import { Box, Button, List, Typography } from "@material-ui/core";

// useContext
import { AuthContext } from "App";

// molecules
import { AvaterItem } from "components/molecules/AvaterItem";

// interface
import { User } from "interfaces/get/User";

// hooks
import { UseFollow } from "hooks/useFollow";


const FixedBox = styled(Box)`
  position: fixed;
`
const ListTextItem = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`
const GrayText = styled(Typography)`
  font-weight: 700;
  color: #8e8e8e;
`
const AllSeeButton = styled(Button)`
  font-weight: 700;
  font-size: 12px;
`
const FollowButton = styled(Button)`
  color: #0095f6;
  font-weight: 700; 
  font-size: 11px;
`
const Follow = styled.div`
  color: #0095f6;
  font-weight: 700; 
  font-size: 11px;
`
const Followed = styled.div`
  color: gray;
  font-weight: 700; 
  font-size: 11px;
`

interface Props {
  OtherUsers: Array<User>
}

export const SideFollowList = (props: Props) => {

  const { currentUser } = useContext(AuthContext)

  const { OtherUsers } = props

  return (
    <>
      {
        currentUser && OtherUsers ?
        <FixedBox>
          <List>
            <AvaterItem
              userName={currentUser.name}
              ImageSrc={currentUser.image?.url}
              AvaterSize={50}
              ItemGap={15}
            />

            <ListTextItem>
              <GrayText>おすすめ</GrayText>
              <AllSeeButton >すべて見る</AllSeeButton>
            </ListTextItem>

            {
              OtherUsers.map((OtherUser) => (
                <div key={OtherUser.id}>
                  <AvaterItem
                    userName={OtherUser.name}
                    ImageSrc={OtherUser.image?.url}
                    AvaterSize={30}
                  >
                    <Button
                      id="follow"
                      onClick={(e) => {
                        UseFollow({OtherUser, e})
                      }}                    
                    >
                      フォローする
                    </Button>

                  </AvaterItem>
                </div>


              ))
            }

          </List>

        </FixedBox>
        :
        <></>
      }
    </>
  )
}
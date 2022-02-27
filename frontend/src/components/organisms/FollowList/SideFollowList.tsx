import { useContext } from "react";
import styled from "styled-components";

import { Box, Button, List, Typography } from "@material-ui/core";

// useContext
import { AuthContext } from "App";

// interface
import { UsersProps } from "interfaces/users"

// atom
import { FollowButton } from "components/atoms/Button/FollowButton";

// molecules
import { AvaterItem } from "components/molecules/AvaterItem";



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

interface Props {
  users: UsersProps
}

export const SideFollowList = (props: Props) => {

  const { currentUser } = useContext(AuthContext)

  const { users } = props

  return (
    <>
      {
        currentUser && users ?
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
              users.users.map((user) => (
                <AvaterItem
                  userName={user.name}
                  ImageSrc={user.image?.url}
                  AvaterSize={30}
                >
                  <FollowButton/>
                </AvaterItem>
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
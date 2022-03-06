import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Box, Button, Grid } from "@material-ui/core";

// useContext
import { AuthContext } from "App";

// molecures
import { AvaterItem } from "components/molecules/AvaterItem";

// interface
import { User } from "interfaces/get/User";

// hooks
import { useSizing } from "hooks/useSizing";

const Wapper = styled(Box)`
  margin: 20px 0;
  font-weight: 700;
  text-align: center;
`
const UserWapper = styled(Box)`
  display: flex;
`
const NoContent = styled(Box)`
  color: #93a5b1;
  overflow-wrap: break-word;
`
const UserButton = styled(Button)`
  margin: 0 10px;
  font-size: 10px;
  color: #0095f6;
  font-weight: bold;
  border: 1px solid #0095f6;
`
const FollowButton = styled(Button)`
  font-size: 2px;
  padding: 2px;
`

interface Props {
  SearchedUsers: Array<User>
  DisplayText: string | undefined
}

export const SearchContent = (props: Props) => {

  // サイズレスポンシブ
  const AvaterSize = useSizing() ? 50 : 35
  const ItemGap    = useSizing() ? 10 : 5

  const history = useHistory();

  const { currentUser } = useContext(AuthContext)

  const { SearchedUsers, DisplayText } = props


  return (

      
      <Wapper>

        {
          SearchedUsers && currentUser  ?

          SearchedUsers.map((User) => 
            <UserWapper key={User.id}>
              <AvaterItem
                userName={User.name}
                ImageSrc={User.image?.url}
                AvaterSize={AvaterSize}
                ItemGap={ItemGap}
              >
                {
                  currentUser.followings.some((curentFollowing) => curentFollowing.id == User.id) ?
                  <FollowButton
                    id="followed_button"
                  >
                    フォロー中
                  </FollowButton>
                  :
                  <FollowButton
                    id="follow_button"
                  >
                    フォロー
                  </FollowButton>
                }

              </AvaterItem>
            </UserWapper>
          )

          :

          <NoContent>{DisplayText} 検索結果がありません</NoContent>

        }

      </Wapper>


  )
}
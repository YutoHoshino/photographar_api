import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//material
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { CardContent, Button, CardActions } from "@material-ui/core";
import { Typography } from "@mui/material";

// atom
import { UserAveter } from "components/atoms/Avater/UserAvater";

// interface
import { UserData } from "interfaces/data/UserData";
import { User } from "interfaces/get/User";
import { LinkButton } from "components/atoms/Button/LinkButton";

// hooks
import { useSizing } from "hooks/useSizing";
import { UseFollowUserBox } from "hooks/useFollow";

// useContext
import { AuthContext, PostContext } from "App";


const FlexBox = styled(Box)`
  display: flex;
`
const ImageWapper = styled(Grid)`
  padding: 10px;
`
const ItemWapper = styled(Box)`
  padding: 20px;
`
const FlexItem = styled.div`
  display: flex;
`
const FlexList = styled.div`
  display: flex;
  margin-top: 10px;
`
const Link = styled(Typography)`
  cursor: pointer;
  margin-right: 10px !important;
`
const FollowButton = styled(Button)`
  margin: 2px 5px;
  font-size: 10px;
  font-weight: bold;
`


interface Props {
  UserData: UserData
  setIsOpen: any
}

export const UserProfileItem = (props: Props) => {

  const { currentUser } = useContext(AuthContext)
  const { isFollowed, setIsFollowed } = useContext(PostContext)

  const history = useHistory();
  
  const { UserData, setIsOpen } = props

  // サイズ変更
  const AvaterSize = useSizing() ? 110 : 90
  const NameSize   = useSizing() ? "h5" : "h6"
  const LinkSize   = useSizing() ? "inherit" : "subtitle2"
  
  // フォロー機能の代入
  const User = UserData.user

  return (
    <>
      {
        currentUser ?
          <FlexBox
            sx={{ width: { md: "950px"}}}
          >
    
            <ImageWapper>
              <UserAveter
                userName={UserData.user.name}
                ImageSrc={UserData.user.image?.url}
                AvaterSize={AvaterSize}
              />
            </ImageWapper>
      
            <ItemWapper>
      
              <FlexItem>
      
                <Typography variant={NameSize}>
                  {UserData.user.name}
                </Typography>
      
                {
                  UserData.user.id == currentUser?.id ?
                    <LinkButton
                      Url={`/user/${UserData.user?.name}/edit`}
                    >
                      修正
                    </LinkButton>
                  :
                  <>
                    {
                      currentUser?.followings.some((curentFollowing) => curentFollowing.id == UserData.user.id) ?
                        <FollowButton
                          id="followed_button"
                          onClick={(e) => {
                            UseFollowUserBox({User, e, setIsFollowed, isFollowed})
                          }}
                        >
                          フォロー中
                        </FollowButton>
                      :
                        <FollowButton
                          id="follow_button"
                          onClick={(e) => {
                            UseFollowUserBox({User, e, setIsFollowed, isFollowed})
                          }}
                        >
                          フォロー
                        </FollowButton>
                    }
                    <LinkButton>
                      メッセージ
                    </LinkButton>
                  </>
                }
      
              </FlexItem>
      
              <FlexList>
      
                <Link
                  onClick={() => setIsOpen(true)}
                  variant={LinkSize}
                >
                  フォロー{UserData.followings.length}人
                </Link>
                
                <Link
                  onClick={() => setIsOpen(true)}
                  variant={LinkSize}
                >
                  フォロワー{UserData.followers.length}人
                </Link>
      
              </FlexList>
      
            </ItemWapper>
    
    
          </FlexBox>
        :
          <></>
      }
    </>
  )
}
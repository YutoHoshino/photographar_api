import { useContext } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

//material ui
import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@material-ui/core"

// useContext
import { PostContext } from "App";

// hooks
import { useSizing } from "hooks/useSizing";
import { UseFollowUserBox } from "hooks/useFollow";

// interface
import { User } from "interfaces/get/User";
import { UserAveter } from "components/atoms/Avater/UserAvater";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const FollowListCard = styled(Card)`
  margin-bottom: 30px;
  box-shadow: none !important;;
  border: 1px solid #dbdbdb;
`
const ListTextItem = styled(Box)`
  padding: 10px 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const GrayText = styled(Typography)`
  font-weight: bold;
  color: #8e8e8e;
`
const AllSeeButton = styled(Button)`
  font-weight: 700;
  font-size: 12px;
  color: #0095f6;
`
const UserCard = styled(Card)`
  padding: 30px 0 20px;
  display: block;
  text-align: center;
  box-shadow: none !important;
  border: 1px solid #dbdbdb;
`
const UserSwiper = styled(Swiper)`
  padding: 0 20px;
  margin: 20px 0;
`
const Avaterwapper = styled(Grid)`
  width: 50px; 
  margin: 0 auto;
`
const NameText = styled(Typography)`
  padding: 10px 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const FollowButton = styled(Button)`
  font-size: 10px;
  font-weight: bold;
  &:hover {
    background: #0095f5;
  }
`

interface Props {
  OtherUsers: Array<User>
}

export const SwopperFollowList = (props: Props) => {

  const { isFollowed, setIsFollowed } = useContext(PostContext)

  const { OtherUsers } = props

  return (
    <FollowListCard
      sx={{width: {xs:"375px", md: "500px"}}}
    >

      <ListTextItem>
        <GrayText style={{fontWeight: "bold"}}>
          おすすめ
        </GrayText>

        <AllSeeButton>
          すべて見る
        </AllSeeButton>
      </ListTextItem>

      <UserSwiper
        
        slidesPerView={
          useSizing() ? 3 : 2
        }
        spaceBetween={20}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
      >

        {
          OtherUsers.map((User) => 
          <SwiperSlide
            key={User.id}
          >

            <UserCard>

              <Avaterwapper>
                <UserAveter
                  userName={User.name}
                  ImageSrc={User.image?.url}
                  AvaterSize={50}
                  Url={`/user/${User.name}`}
                />
              </Avaterwapper>

              <NameText
                variant="body2"
              >
                {User.name}
              </NameText>

              <FollowButton
                id="follow_button"
                onClick={(e) => {
                  UseFollowUserBox({User, e, setIsFollowed, isFollowed})
                }}
              >
                フォローする
              </FollowButton>
                
            </UserCard>

          </SwiperSlide>
          )
        }

      </UserSwiper>

    </FollowListCard>
  )
}
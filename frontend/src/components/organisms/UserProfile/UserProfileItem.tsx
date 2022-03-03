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


const FlexBox = styled(Box)`
  display: flex;
`
const ImageWapper = styled(Grid)`
  padding: 10px;
`
const FlexCardContent = styled(CardContent)`
  display: flex;
`
const EditButton = styled(Button)`
  margin-left: 15px;
`
const ActionWapper = styled(CardActions)`
  padding: 10px 16px;
`
const Link = styled(Typography)`
  cursor: pointer;
`
interface Props {
  UserData: UserData
  currentUser: User
  setIsOpen: any
}

export const UserProfileItem = (props: Props) => {

  const history = useHistory();
  
  const { UserData, currentUser, setIsOpen } = props
  
  return (
    <FlexBox
      sx={{ width: { md: "950px"}}}
    >

      <ImageWapper>
        <UserAveter
          userName={UserData.user.name}
          ImageSrc={UserData.user.image?.url}
          AvaterSize={120}
        />
      </ImageWapper>

      <Grid>

        <FlexCardContent>
          <Typography variant="h4">
            {UserData.user.name}
          </Typography>
          {
            UserData.user.id == currentUser.id ?
            <>
              <EditButton
                onClick={()=> {history.push(`/user/${UserData.user?.name}/edit`)}}
                variant="outlined" 
              >
                修正
              </EditButton>
            </>
            :
            null
          }
        </FlexCardContent>

        <ActionWapper>


          <Typography
            sx={{display: { md: "block", xs: "none"}}}
          >
            投稿{UserData.posts.length}件
          </Typography>

          <Link
            onClick={() => setIsOpen(true)}
          >
            フォロー{UserData.followings.length}人
          </Link>
          
          <Link
            onClick={() => setIsOpen(true)}
          >
            フォロワー{UserData.followers.length}人
          </Link>

        </ActionWapper>
      </Grid>



    </FlexBox>
  )
}
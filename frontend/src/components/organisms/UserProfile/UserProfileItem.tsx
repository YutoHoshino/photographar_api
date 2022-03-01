import { useHistory } from "react-router-dom";
import styled from "styled-components";

//material
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography, CardContent, Button, CardActions } from "@material-ui/core";

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

interface Props {
  UserData: UserData
  currentUser: User
}

export const UserProfileItem = (props: Props) => {

  const history = useHistory();
  
  const { UserData, currentUser } = props
  
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

        <CardActions>
          <Box>
            投稿{UserData.posts.length}件
          </Box>

          <Box>
            フォロワー0人
          </Box>

          <Box>
            フォロー0人
          </Box>
        </CardActions>
      </Grid>



    </FlexBox>
  )
}
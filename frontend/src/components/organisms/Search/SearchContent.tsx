import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Box, Button, Grid } from "@material-ui/core";

// molecures
import { AvaterItem } from "components/molecules/AvaterItem";

// interface
import { User } from "interfaces/get/User";

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

interface Props {
  SearchedUsers: Array<User>
  DisplayText: string | undefined
}

export const SearchContent = (props: Props) => {

  const history = useHistory();

  const { SearchedUsers, DisplayText } = props

  return (
    <Grid container justifyContent="center">
      
      <Wapper
        sx={{width: {sx: "400px", md: "400px"}}}
      >

        {
          SearchedUsers  ?

          SearchedUsers.map((User) => 
            <UserWapper key={User.id}>
              <AvaterItem
                userName={User.name}
                ImageSrc={User.image?.url}
                AvaterSize={50}
                ItemGap={10}
              >
                <UserButton
                  onClick={e => history.push(`/user/${User.name}`)}
                >
                  アカウントへ移動
                </UserButton>

              </AvaterItem>
            </UserWapper>
          )

          :

          <NoContent>{DisplayText} 検索結果がありません</NoContent>

        }

      </Wapper>

    </Grid>
  )
}
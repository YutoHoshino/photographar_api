import styled from "styled-components";
import { Box, Button, Grid } from "@material-ui/core";

// interface
import { User } from "interfaces/get/User";
import { UserAveter } from "components/atoms/Avater/UserAvater";
import { AvaterItem } from "components/molecules/AvaterItem";

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
`

interface Props {
  SearchedUsers: Array<User> | undefined
}

export const SearchContent = (props: Props) => {

  const { SearchedUsers } = props

  console.log(SearchedUsers)

  return (
    <Grid container justifyContent="center">
      
      <Wapper>

        {
          SearchedUsers ?

          SearchedUsers.map((User) => 
            <UserWapper>
              <AvaterItem
                userName={User.name}
                ImageSrc={User.image?.url}
                AvaterSize={50}
                ItemGap={10}
              >
              <Button
              >
                
              </Button>
              </AvaterItem>
            </UserWapper>
          )

          :
          <NoContent>検索結果がありません</NoContent>

        }

      </Wapper>

    </Grid>
  )
}
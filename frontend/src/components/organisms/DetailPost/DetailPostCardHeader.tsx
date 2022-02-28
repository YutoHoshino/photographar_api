import styled from "styled-components";

import CardHeader from '@mui/material/CardHeader';

//molecules
import { UserAveter } from "components/atoms/Avater/UserAvater";

// 時間フォーマット
import moment from 'moment'

// interface
import { PostData } from "interfaces/Posts"

const Header = styled(CardHeader)`
  border-bottom: solid 1px #efefef;
`

interface Props {
  PostData: PostData
}

export const DetailPostCardHeader = (props: Props) => {

  const { PostData} = props
  
  return (
    <Header
      avatar={
        <UserAveter 
          userName={PostData.user.name}
          ImageSrc={PostData.user.image?.url}
          Url={`/user/${PostData.user.name}`}
        /> 
      }
      title={
        PostData.user.name
      }
      subheader={
        moment(PostData.post.created_at).format('YYYY年MM月DD日')
      }
    />
  )
}
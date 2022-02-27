import { useHistory } from 'react-router-dom';

import styled from "styled-components";
import { CardHeader, IconButton } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { UserAveter } from "components/atoms/Avater/UserAvater"

// 時間フォーマット
import moment from 'moment'

// interface
import { GetPostdata } from "interfaces"

const NoneDiv = styled.div`
  display: none;
`
const UserName = styled.div`
  cursor: pointer;
`

interface Props {
  postdata: GetPostdata
  MenuOpen: any
}

export const PostCardHeader = (props: Props) => {

  const history = useHistory();

  const { postdata, MenuOpen } = props

  return (
    <CardHeader
      avatar={
        <UserAveter
          userName={postdata.user.name}
          ImageSrc={postdata.user.image?.url}
          Url={`/user/${postdata.user.name}`}
        />
      }
      action={
        <IconButton onClick={MenuOpen}>
          <NoneDiv>{postdata.post.id}</NoneDiv>
          <MoreVertIcon/>
        </IconButton>
      }
      title={
        <UserName
          onClick={() => {history.push(`/user/${postdata.user.name}`)}}
        >
          {postdata.user.name}
        </UserName>
      }
      subheader={
        moment(postdata.post.created_at).format('YYYY年MM月DD日')
      }

    />
  )
}
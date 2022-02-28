import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from "styled-components";
import { CardHeader, IconButton } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { UserAveter } from "components/atoms/Avater/UserAvater"

// 時間フォーマット
import moment from 'moment'

// components
import { PostActionModal } from "components/Modal/PostActionModal";

// interface
import { PostData } from "interfaces/Posts";


const NoneDiv = styled.div`
  display: none;
`
const UserName = styled.div`
  cursor: pointer;
`

interface Props {
  postdata: PostData
}

export const PostCardHeader = (props: Props) => {

  // PostMenuモーダル表示
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postId, setPostId] = useState<null | Number>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    setPostId(event.currentTarget.querySelector('svg').previousElementSibling.textContent)
    setAnchorEl(event.currentTarget);
  }

  const history = useHistory();

  const { postdata } = props

  return (
    <>

      <CardHeader
        avatar={
          <UserAveter
            userName={postdata.user.name}
            ImageSrc={postdata.user.image?.url}
            Url={`/user/${postdata.user.name}`}
          />
        }
        action={
          <IconButton onClick={(e) => {handleMobileMenuOpen(e)}}>
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

      {/* アクションモーダル */}
      <PostActionModal
        isPostModal={isPostModal}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        postId={postId}
        setAnchorEl={setAnchorEl}
      />
      
    </>
  )
}
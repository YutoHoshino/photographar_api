import { useContext } from "react"

import styled from "styled-components";

// material
import { Card, LinearProgress } from '@material-ui/core';
import Grid from '@mui/material/Grid';

// useContext
import { AuthContext } from "App";

// components
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";

// organisms
import { PostCardHeader } from "components/organisms/PostCard/PostCardHeader";
import { PostSwiper } from "components/organisms/PostCard/PostSwiper";
import { PostLikeWapper } from "components/organisms/PostCard/PostLikeWapper";
import { PostCommentContent } from "components/organisms/PostCard/PostCommentContent";
import { PostCardAction } from "components/organisms/PostCard/PostCardAction";
import { PostCommentField } from "components/organisms/PostCard/PostCommentField";
import { SideFollowList } from "components/organisms/FollowList/SideFollowList";

// interface
import { PostData } from "interfaces/Posts";

// hooks
import { useFollowUser } from "hooks/useFollowUser";
import { useAllPosts } from "hooks/useAllPosts";

// style css
const PostCard = styled(Card)`
  max-width: 500px;
  margin-bottom: 50px;
  box-shadow: none;
  border: 1px solid #dbdbdb;
`
const FlexBox = styled(Grid)`
  display:flex;
`
const FollowList = styled(Grid)`
  padding-left: 50px;
  width: 300px; 
`

export const Posts = () => {

  const { currentUser } = useContext(AuthContext)

  const Posts = useAllPosts()

  const FollowUsers = useFollowUser()

  console.log(FollowUsers)

  return(
    <>
      {
        currentUser && Posts && FollowUsers ? 
        (
          <CommonLayout>

            <FlexBox>

              <Grid>

                {Posts.map((postdata: PostData) => {

                  let likeCount = postdata.likes.length // likeカウント

                  return (
                    <PostCard key={postdata.post.id}>

                      <PostCardHeader postdata={postdata}/>

                      <PostSwiper photos={postdata.photos}/>

                      <PostCardAction postdata={postdata} likeCount={likeCount}/>
                      
                      <PostLikeWapper postdata={postdata}/>

                      <PostCommentContent postdata={postdata}/>

                      <PostCommentField postdata={postdata}/>
                
                    </PostCard>
                  )
                })}

              </Grid>

              <FollowList sx={{display: { xs: 'none', md: 'block'}}}>
                <SideFollowList FollowUsers={FollowUsers}/>
              </FollowList>

            </FlexBox>
            
          </CommonLayout>          
        )
        :
        (
          <LoadLayout>
            <div>ロード中・・・</div>
            <LinearProgress/>
          </LoadLayout>
        )
      }

    </>
  )
}
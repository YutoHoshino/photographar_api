import { memo, useContext } from "react"
import styled from "styled-components";

// material
import { Card, LinearProgress } from '@material-ui/core';
import Grid from '@mui/material/Grid';

// useContext
import { AuthContext } from "App";

// template
import { CommonLayout } from "components/templates/CommonLayout";
import { LoadLayout } from "components/templates/LoadLayout";

// organisms
import { PostCardHeader } from "components/organisms/TopPostCard/PostCardHeader";
import { PostSwiper } from "components/organisms/TopPostCard/PostSwiper";
import { PostLikeWapper } from "components/organisms/TopPostCard/PostLikeWapper";
import { PostCommentContent } from "components/organisms/TopPostCard/PostCommentContent";
import { PostCardAction } from "components/organisms/TopPostCard/PostCardAction";
import { PostCommentField } from "components/organisms/TopPostCard/PostCommentField";
import { SideFollowList } from "components/organisms/FollowList/SideFollowList";
import { SwopperFollowList } from "components/organisms/FollowList/SwipperFollowList";

// hooks
import { useOtherUser } from "hooks/useOtherUser";
import { useAllPosts } from "hooks/useAllPosts";

// interface
import { PostData } from "interfaces/data/PostData";


// style css
const PostCard = styled(Card)`
  max-width: 500px;
  margin-bottom: 30px;
  box-shadow: none !important;
  border: 1px solid #dbdbdb;
`
const FlexBox = styled(Grid)`
  display:flex;
`
const FollowList = styled(Grid)`
  padding-left: 50px;
  width: 300px; 
`

export const HomePage = memo(() => {

  const { currentUser } = useContext(AuthContext)

  const Posts = useAllPosts()

  const OtherUsers = useOtherUser()

  return(
    <>
      {
        currentUser && Posts && OtherUsers ? 

        <CommonLayout>
          <FlexBox>
            <Grid>
              <SwopperFollowList
                OtherUsers={OtherUsers}
              />
              {Posts.map((postdata: PostData) => {
                let likeCount = postdata.likes.length // likeカウント
                return (
                  <PostCard 
                    key={postdata.post.id}
                  >

                    <PostCardHeader 
                      postdata={postdata}
                    />

                    <PostSwiper 
                      photos={postdata.photos}
                    />

                    <PostCardAction 
                      postdata={postdata}
                      likeCount={likeCount}
                      currentUser={currentUser}
                    />

                    <PostLikeWapper 
                      postdata={postdata}
                    />

                    <PostCommentContent 
                      postdata={postdata}
                    />

                    <PostCommentField 
                      postdata={postdata}
                    />

                  </PostCard>
                )
              })}
            </Grid>

            <FollowList sx={{display: { xs: 'none', md: 'block'}}}>
              <SideFollowList OtherUsers={OtherUsers}/>
            </FollowList>
            
          </FlexBox>
        </CommonLayout>

        :
        
        <LoadLayout>
          <div>ロード中・・・</div>
          <LinearProgress/>
        </LoadLayout>
        
      }

    </>
  )
})
// import { useContext, useEffect, useReducer, useState } from "react"

// import styled from "styled-components";

// // material
// import { Card, LinearProgress } from '@material-ui/core';
// import Grid from '@mui/material/Grid';

// // apis
// import { postGetData } from "apis/post"
// import { UserAll } from "apis/user";

// // reductor
// import { postsReductor } from "reducers/postsReductor"

// // useContext
// import { AuthContext, PostContext } from "App";

// // components
// import { CommonLayout } from "components/Layout/CommonLayout";
// import { LoadLayout } from "components/Layout/LoadLayout";

// // organisms
// import { PostCardHeader } from "components/organisms/PostCard/PostCardHeader";
// import { PostSwiper } from "components/organisms/PostCard/PostSwiper";
// import { PostLikeWapper } from "components/organisms/PostCard/PostLikeWapper";
// import { PostCommentContent } from "components/organisms/PostCard/PostCommentContent";
// import { PostCardAction } from "components/organisms/PostCard/PostCardAction";
// import { PostCommentField } from "components/organisms/PostCard/PostCommentField";

// // interface
// import { GetPostdata } from "interfaces"
// import { UsersProps } from "interfaces/users";
// import { SideFollowList } from "components/organisms/FollowList/SideFollowList";


// // style css
// const PostCard = styled(Card)`
//   max-width: 500px;
//   margin-bottom: 50px;
//   box-shadow: none;
//   border: 1px solid #dbdbdb;
// `
// const FlexBox = styled(Grid)`
//   display:flex;
// `
// const FollowList = styled(Grid)`
//   padding-left: 50px;
//   width: 300px; 
// `

export const Posts = () => {

  // const { currentUser } = useContext(AuthContext)

  // const [users, setUsers] = useState<UsersProps>();
  // useEffect(() => {
  //   UserAll()
  //   .then((data) => {
  //     setUsers(data)
  //   })
  // },[])

  // const { isPosted, setIsPosted } = useContext(PostContext)

  // // 投稿内容取得
  // const initialState = {
  //   fetchState: "INITIAL",
  //   postList: []
  // }
  // const [state, dispatch] = useReducer(postsReductor, initialState);
  // useEffect(() => {
  //   dispatch({ type: 'FETCHING' });
  //   postGetData()
  //   .then((data) => {
  //     dispatch({ 
  //       type: 'FETCH_SUCCESS',
  //       payload: data,
  //     });
  //   })
  //   setIsPosted(false)
  // }, [isPosted])

  return(
    <>
      {/* {
        state.fetchState == "OK" && state.postList.posts != undefined && users && currentUser ? 
        (
          <CommonLayout>

            <FlexBox>

              <Grid>

                {state.postList.posts.map((postdata: GetPostdata) => {

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
                <SideFollowList users={users}/>
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
      } */}

    </>
  )
}
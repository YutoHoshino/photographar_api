import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";

// material
import Card from '@mui/material/Card';
import { 
  Avatar, 
  Box, 
  Button, 
  CardActions, 
  CardHeader, 
  IconButton, 
  LinearProgress, 
  TextField, 
  Typography
 } from '@material-ui/core';

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"

// component
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";
import { PostSwiper } from 'components/Swiper/PostSwiper';

// apis
import { postShowData } from 'apis/post';

// containers
import { handleLikes } from "containers/Like";

// interface
import { GetPostdata } from 'interfaces';

// useContext
import { AuthContext } from 'App';

// style css
const SCard = styled(Card)`
  max-width: 850px;
  min-height: 550px;
  margin-bottom: 50px;
  box-shadow: none;
  border: 1px solid #dbdbdb;
`
const SPostSwiper = styled(PostSwiper)`
  height: 100%;
`
const ContextWapper = styled(Box)`
  min-width: 250px;
`
const TextWapper = styled(Box)`
  padding: 16px;
  height: 300px;
`
const CommentWapper = styled(Box)`
  padding: 16px;
`
const Sform = styled.form`
  display:flex
`

export const Post = ({ match }: any) => {

  const { currentUser } = useContext(AuthContext)

  // 対象のPostID
  const params = {id: match.params.postId}

  const [post, setPost] = useState<GetPostdata | undefined>()

  useEffect(() => {
    postShowData(params)
    .then(data => {
      setPost(data.post)
    })
  },[])

  return (

    <>
      { post? 
        <CommonLayout>
          <SCard sx={{ display: 'flex' }}>

            <SPostSwiper photos={post.photos} height="550"/>
            <ContextWapper>

              <CardHeader
                avatar={
                  <Avatar
                    alt={post.user.name}
                    src={post.user.image?.url}
                  />
                }
                title={
                  post.user.name
                }
              />

              <TextWapper>
                <Typography variant="body2" >
                  {post.post?.caption}
                </Typography>
              </TextWapper>

              <CardActions>
                
                <IconButton
                  onClick={(e) => {
                    handleLikes(
                      {
                        postId: post.post.id,
                        likesCount: post.likes.length,
                        e:e
                      }
                    )
                  }}
                >
                  <FavoriteIcon id={post.likes.some((like)=>like.user_id == currentUser?.id) ? "liked" : ""}/>
                </IconButton>

                <IconButton>
                  <Comment />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </CardActions>
              
              <CommentWapper>
                <Sform>

                  <TextField 
                    margin="dense"
                    placeholder='コメント...'
                  />
                  <Button
                    type="submit"
                  >
                    送信
                  </Button>     
                </Sform>
              </CommentWapper>


            </ContextWapper>
          </SCard>
        </CommonLayout>
        :
        <LoadLayout>
          <div>ロード中・・・</div>
          <LinearProgress/>
        </LoadLayout>
      }

    </>
  )
}
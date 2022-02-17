import React, { useEffect, useState } from 'react';
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
import MoreVertIcon from "@material-ui/icons/MoreVert";

// component
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";

// apis
import { postShowData } from 'apis/post';

// compornent
import { PostSwiper } from 'components/Swiper/PostSwiper';
import { GetPostdata } from 'interfaces';
import { PrimaryTextField } from 'components/TextField/PrimaryTextField';

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
                
                <IconButton>
                  <FavoriteIcon />
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
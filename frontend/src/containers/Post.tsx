import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";

// material
import Card from '@mui/material/Card';
import { 
  Avatar, 
  Button, 
  CardHeader, 
  Grid, 
  IconButton, 
  LinearProgress, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  makeStyles, 
  TextField, 
  Theme, 
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
import { handleComment } from "containers/Comment";

// interface
import { GetPostdata } from 'interfaces';

// useContext
import { AuthContext } from 'App';


const useStyles = makeStyles((theme: Theme) => ({
  RootCard: {
    maxWidth: "800px",
    minHeight: "550px",
    boxShadow: "none",
    border: "1px solid #dbdbdb"
  },
  ContextWapper: {
    minWidth: "250px"
  },
  CardHeader: {
    height: "56px",
    borderBottom: "solid 1px #efefef",
  },
  CommentList: {
    padding: "16px",
    minHeight: "280px",
    height: "280px",
    overflow: "scroll",
  },
  ActionsField: {
    height: "170px",
    padding: "10px 0"
  },
  CardActions: {
    borderTop: "solid 1px #efefef",
    height: "40%",
    padding: "0 16px"
  },
  CardComment: {
    padding: "0 16px",
    height: "30%",
    borderTop: "solid 1px #efefef",
  },
  CardLikeCount: {
    padding: "0 16px",
    height: "30%"
  },
}))

export const Post = ({ match }: any) => {

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext)

  // 対象のPostID
  const params = {id: match.params.postId}

  const [post, setPost] = useState<GetPostdata>()

  useEffect(() => {
    postShowData(params)
    .then(data => {
      setPost(data.post)
    })
  },[])
  
  // ライクの初期化
  let likeCount = post?.likes.length

  // コメント
  const [comment, setComment] = useState<String>("")

  return (

    <>
      { post?
        
        <CommonLayout>

          {/* カードメイン枠 */}
          <Card 
            sx={{ display: 'flex' }}
            className={classes.RootCard}
          >

            {/* 写真（右側） */}
            <PostSwiper photos={post.photos} height="600"/>

            {/* アクション（左側） */}
            <Grid
              className={classes.ContextWapper}
            >

              {/* アイコン&名前 */}
              <CardHeader
                className={classes.CardHeader}
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

              {/* コメント一覧 */}
              <Grid className={classes.CommentList}>

                <ListItem alignItems="flex-start">

                  <ListItemAvatar>
                    <Avatar
                      alt={post.user.name}
                      src={post.user.image?.url}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {post.user.name}
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {post.post.caption}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                {
                  post.comments.length == 0 ?
                    <></>
                  :
                  post.comments.map((comment, key) => 

                    <ListItem alignItems="flex-start" key={key}>
                      <ListItemAvatar>
                        <Avatar
                          alt={comment.user.name}
                          src={comment.user.image?.url}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        style={{ overflowWrap: "break-word", width: "200px"}}
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {comment.user.name}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {comment.text}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  )
                }
                
              </Grid>


              <Grid className={classes.ActionsField}>

                {/* アイコン一覧 */}
                <Grid className={classes.CardActions}>
                  <IconButton
                    onClick={(e) => {
                      likeCount = handleLikes(
                        {
                          postId: post.post.id,
                          likesCount: likeCount || 0,
                          e:e
                        }
                      )
                    }}
                  >
                    <FavoriteIcon id={post.likes.some((like)=>like.user_id == currentUser?.id) ? "liked" : ""}/>
                  </IconButton>

                  <IconButton
                    onClick={(() => {})}
                  >
                    <Comment />
                  </IconButton>

                  <IconButton
                    onClick={(() => {})}
                  >
                    <ShareIcon />
                  </IconButton>
                </Grid>
                
                {/* いいね数 */}
                <Grid className={classes.CardLikeCount}>
                  <Typography 
                    style={{ fontWeight: "bold" }}
                    variant="body2"
                    id={`like-count-${post.post.id}`} 
                    >
                      {
                        post.likes.length == 0 ?
                        null
                        :
                        `${post.likes.length}件のいいね`
                      }
                  </Typography>
                </Grid>
                
                {/* コメント入力欄 */}
                <Grid className={classes.CardComment}>
                  <form
                    style={{display: 'flex'}}
                  >
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      placeholder='コメントを追加...'
                      multiline
                      rows={2}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
        
                    <Button 
                      type="submit"
                      variant="text"
                      color="primary"
                      style={{fontWeight: 'bold'}}
                      onClick={(e) => {
                        e.preventDefault()
                        setComment("")
                        handleComment(
                          {
                            comment: comment,
                            postId: post.post.id,
                            setPost: setPost
                          }
                        )
                      }}
                    > 
                      送信
                    </Button>


                  </form>
                </Grid>

              </Grid>

            </Grid>
            
          </Card>
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
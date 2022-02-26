import { 
  useContext, 
  useEffect, 
  useReducer, 
  useState 
} from "react"
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// 時間フォーマット
import moment from 'moment'

// material
import {
  makeStyles,
  Theme,
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  IconButton, 
  LinearProgress, 
  Typography,
  TextField,
  Button,
  Box,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"
import MoreVertIcon from "@material-ui/icons/MoreVert";

// apis
import { postGetData } from "apis/post"
import { UserAll } from "apis/user";

// reductor
import { postsReductor } from "reducers/postsReductor"

// useContext
import { AuthContext, PostContext } from "App";

// components
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";
import { PostActionModal } from "components/Modal/PostActionModal";
import { PostsSwiper } from "components/Swiper/PostsSwiper";

// interface
import { GetPostdata } from "interfaces"
import { UsersProps } from "interfaces/users";

// containers
import { handleLikes } from "containers/Like";
import { handleComments } from "containers/Comment";
import { Stack } from "@mui/material";

// style css
const SCard = styled(Card)`
  max-width: 500px;
  margin-bottom: 50px;
  box-shadow: none;
  border: 1px solid #dbdbdb;
`
const STypography = styled(Typography)`
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Sheader = styled.header`
  margin-bottom: 80px;
`
const Sdiv = styled.div`
  display: none;
`
const LikeWapper = styled.div`
  padding: 0 16px;
`
const CommentWapper = styled(Box)`
  padding: 10px 16px;
  border-top: solid 1px #efefef;
`
const Sform = styled.form`
  display:flex
`

const useStyles = makeStyles((theme: Theme) => ({
  Avatar: {
    cursor: "pointer"
  },
  CommentField: {
    fontSize: "13px",
    whiteSpace: "pre-line",
  },
  AllComent: {
    color: "#8e8e8e",
    fontWeight: 500,
    cursor: "pointer"
  }
}))



export const Posts = () => {

  const classes = useStyles();

  const history = useHistory();

  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState<UsersProps>();
  useEffect(() => {
    UserAll()
    .then((data) => {
      setUsers(data)
    })
  },[])

  const { isPosted, setIsPosted } = useContext(PostContext)

  // 投稿内容取得
  const initialState = {
    fetchState: "INITIAL",
    postList: []
  }
  const [state, dispatch] = useReducer(postsReductor, initialState);
  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    postGetData()
    .then((data) => {
      dispatch({ 
        type: 'FETCH_SUCCESS',
        payload: data,
      });
    })
    setIsPosted(false)
  }, [isPosted])

  // PostMenuモーダル表示
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postId, setPostId] = useState<null | Number>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    setPostId(event.currentTarget.querySelector('svg').previousElementSibling.textContent)
    setAnchorEl(event.currentTarget);
  }

  // コメント
  const [comment, setComment] = useState<String>("")

  return(
    <>
      {
        state.fetchState == "OK" && state.postList.posts != undefined && users && currentUser ? 
        (
          <CommonLayout>

            <Grid style={{display: "flex"}}>

              <Grid>
                {state.postList.posts.map((postdata: GetPostdata) => {

                  // likeカウント
                  let likeCount = postdata.likes.length

                  return (
                    <SCard 
                      key={postdata.post.id}>

                      <CardHeader
                        avatar={
                          postdata.user.image ? (
                            <Avatar
                              className={classes.Avatar}
                              onClick={() => {history.push(`/user/${postdata.user.name}`)}}
                              alt={postdata.user.name}
                              src={postdata.user.image.url}
                            />
                          ) : (
                            null
                          )
                        }
                        action={
                          <>
                            <IconButton
                              onClick={handleMobileMenuOpen} 
                            >
                              <Sdiv>{postdata.post.id}</Sdiv>
                              <MoreVertIcon/>
                            </IconButton>
                          </>
                        }
                        title={
                          <div
                            className={classes.Avatar}
                            onClick={() => {history.push(`/user/${postdata.user.name}`)}}
                          >
                            {postdata.user.name}
                          </div>
                        }
                        subheader={
                          moment(postdata.post.created_at).format('YYYY年MM月DD日')
                        }
                      />

                      
                      <PostsSwiper photos={postdata.photos}/>

                      <CardActions disableSpacing>
                        
                        <IconButton 
                          onClick={(e) => {
                            likeCount = handleLikes(
                              {
                                postId: postdata.post.id, 
                                likesCount: likeCount,
                                e:e,
                              }
                            )
                          }}
                        >

                          <FavoriteIcon id={postdata.likes.some((like)=>like.user_id == currentUser?.id) ? "liked" : ""}/>
                        </IconButton>

                        <IconButton>
                          <Comment />
                        </IconButton>
                        <IconButton>
                          <ShareIcon />
                        </IconButton>
                      </CardActions>

                      
                      <LikeWapper>
                        <STypography 
                          style={{ fontWeight: "bold" }}
                          variant="body2"
                          id={`like-count-${postdata.post.id}`} 
                          >

                            {
                              postdata.likes.length == 0 ?
                              null
                              :
                              `${postdata.likes.length}件のいいね`
                            }

                        </STypography>
                      </LikeWapper>

                      <CardContent>
                        <Typography variant="body2" >
                          <strong>{postdata.user.name}&nbsp;</strong>
                          {postdata.post.caption}
                        </Typography>

                        <Grid id={`comment-${postdata.post.id}`} >
                          {
                            postdata.comments.length < 5 ? 
                            postdata.comments.map((comment) => {
                              return (
                              <Typography variant="body2" key={comment.id}>
                                <strong>{comment.user.name}&nbsp;</strong>
                                {comment.text}
                              </Typography>
                              )
                            })
                            :
                            <Typography 
                              variant="body2"
                              className={classes.AllComent}
                              onClick={() => {history.push(`/post/${postdata.post.id}`)}}
                            >
                              コメント{postdata.comments.length}件をすべて見る
                            </Typography>
                          }
                        </Grid>

                      </CardContent>

                      <CommentWapper>
                        <Sform >
                          <TextField
                            margin="dense"
                            required
                            fullWidth
                            placeholder='コメントを追加...'
                            multiline
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            InputProps={{
                              disableUnderline: true,
                              classes: {
                                input: classes.CommentField,
                              },
                            }}
                          />
            
                          <Button 
                            type="submit"
                            variant="text"
                            color="primary"
                            style={{fontWeight: 'bold'}}
                            onClick={(e) => {
                              e.preventDefault()
                              handleComments(
                                {
                                  comment: comment,
                                  postId: postdata.post.id,
                                }
                              )
                              setComment("")
                            }}
                          >
                            送信
                          </Button>
                          
                        </Sform>
                      </CommentWapper>
                
                    </SCard>
                  )
                })}
              </Grid>

              <Grid
                sx={{display: { xs: 'none', md: 'block'}}}
                style={{paddingLeft: "50px", width: "300px" }}
              >
                <Box style={{ position: "fixed"}}>

                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={currentUser?.name}
                          src={currentUser?.image?.url}
                          sx={{ width: 50, height: 50 }}
                          style={{border: '0.1px solid lightgray'}}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        style={{paddingLeft: "15px"}}
                      >
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          >
                        {currentUser?.name}
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        <Typography
                          style={{ fontWeight: "700", color: "#8e8e8e"}}
                          >
                          おすすめ
                        </Typography>
                      </ListItemText>

                      <Button
                        size="small" 
                        style={{ fontWeight: "700"}}
                      >
                        すべて見る
                      </Button>

                    </ListItem>
                  {
                    users.users.map((user) => (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt={user?.name}
                            src={user?.image?.url}
                            sx={{ width: 30, height: 30 }}
                            style={{border: '0.1px solid lightgray'}}
                          />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            {user.name}
                          </Typography>
                        </ListItemText>
                        <Button 
                          size="small" 
                          style={{color: "#0095f6", fontWeight: "700", fontSize: "11px"}}>
                            フォローする
                        </Button>

                      </ListItem>
                    ))
                  }
                  </List>
                </Box>
              </Grid>


            </Grid>
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
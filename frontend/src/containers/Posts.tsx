import { 
  useContext, 
  useEffect, 
  useReducer, 
  useState 
} from "react"
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// material
import {
  makeStyles,
  Theme,
  Card, 
  CardActions, 
  IconButton, 
  LinearProgress, 
  Typography,
  TextField,
  Button,
  Box,
  List,
} from '@material-ui/core';

import Grid from '@mui/material/Grid';

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"

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

// atoms
import { FollowButton } from "components/atoms/Button/FollowButton";

// molecures
import { AvaterItem } from "components/molecules/AvaterItem";

// organisms
import { PostCardHeader } from "components/organisms/PostsCard/PostCardHeader";
import { PostSwiper } from "components/organisms/PostsCard/PostSwiper";
import { PostLikeWapper } from "components/organisms/PostsCard/PostLikeWapper";
import { PostCommentContent } from "components/organisms/PostsCard/PostCommentContent";

// interface
import { GetPostdata } from "interfaces"
import { UsersProps } from "interfaces/users";

// containers
import { handleLikes } from "containers/Like";
import { handleComments } from "containers/Comment";


// style css
const PostCard = styled(Card)`
  max-width: 500px;
  margin-bottom: 50px;
  box-shadow: none;
  border: 1px solid #dbdbdb;
`
const CommentWapper = styled(Box)`
  padding: 10px 16px;
  border-top: solid 1px #efefef;
`
const Sform = styled.form`
  display:flex
`
const FlexBox = styled(Grid)`
  display:flex;
`

const FollowList = styled(Grid)`
  padding-left: 50px;
  width: 300px; 
`
const FixedBox = styled(Box)`
  position: fixed;
`
const GrayText = styled(Typography)`
  font-weight: 700;
  color: #8e8e8e;
`
const AllSeeButton = styled(Button)`
  font-weight: 700;
  font-size: 12px;
`
const ListTextItem = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`

const useStyles = makeStyles((theme: Theme) => ({
  CommentField: {
    fontSize: "13px",
    whiteSpace: "pre-line",
  },
}))



export const Posts = () => {

  const classes = useStyles();

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

            <FlexBox>

              <Grid>
                {state.postList.posts.map((postdata: GetPostdata) => {

                  // likeカウント
                  let likeCount = postdata.likes.length

                  return (
                    <PostCard key={postdata.post.id}>

                      <PostCardHeader
                        postdata={postdata}
                        MenuOpen={handleMobileMenuOpen}
                      />

                      <PostSwiper photos={postdata.photos}/>

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

                        <IconButton
                          onClick={() => {}}
                        >
                          <Comment />
                        </IconButton>

                        <IconButton
                          onClick={() => {}}
                        >
                          <ShareIcon />
                        </IconButton>

                      </CardActions>

                      
                      <PostLikeWapper
                        postdata={postdata}
                      />

                      <PostCommentContent
                        postdata={postdata}
                      />

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
                
                    </PostCard>
                  )
                })}
              </Grid>

              <FollowList sx={{display: { xs: 'none', md: 'block'}}}>
                <FixedBox>

                  <List>
                    <AvaterItem
                      userName={currentUser?.name}
                      ImageSrc={currentUser?.image?.url}
                      AvaterSize={50}
                      ItemGap={15}
                    />

                    <ListTextItem>
                      <GrayText>おすすめ</GrayText>
                      <AllSeeButton >すべて見る</AllSeeButton>
                    </ListTextItem>
                    {
                      users.users.map((user) => (
                        <AvaterItem
                          userName={user?.name}
                          ImageSrc={user?.image?.url}
                          AvaterSize={30}
                        >
                          <FollowButton/>
                        </AvaterItem>
                      ))
                    }
                  </List>

                </FixedBox>
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
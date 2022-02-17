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
  Avatar, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  Grid, 
  IconButton, 
  LinearProgress, 
  Typography 
} from '@material-ui/core';

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"
import MoreVertIcon from "@material-ui/icons/MoreVert";

// apis
import { postGetData } from "apis/post"
import { likeCreate, likeDelete } from "apis/like";

// reductor
import { postsReductor } from "reducers/postsReductor"

// useContext
import { AuthContext, PostContext } from "App";

// components
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";
import { PostActionModal } from "components/Modal/PostActionModal";
import { PostSwiper } from "components/Swiper/PostSwiper";

// interface
import { GetPostdata, LikeProps } from "interfaces"

// containers
import { handleLikes } from "containers/Like";

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

const useStyles = makeStyles((theme: Theme) => ({
  Avatar: {
    cursor: "pointer"
  }
}))

export const Posts = () => {

  const classes = useStyles();

  const history = useHistory();

  const { currentUser } = useContext(AuthContext)
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
    setPostId(event.target.previousElementSibling.textContent)
    setAnchorEl(event.currentTarget);
  }

  return(
    <>
      {
        state.fetchState == "OK" && state.postList.posts != undefined ? 
        (
          <CommonLayout>
            {state.postList.posts.map((postdata: GetPostdata) => {
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
                      postdata.post.created_at
                    }
                  />

                  
                  <PostSwiper photos={postdata.photos} height="400"/>

                  <CardActions disableSpacing>

                    <IconButton 
                      onClick={(e) => {
                        handleLikes(
                          {
                            postId: postdata.post.id, 
                            e:e
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

                  <CardContent>
                    <STypography variant="body2" >
                      {postdata.post.caption}
                    </STypography>
                  </CardContent>
            
                </SCard>
              )
            })}
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
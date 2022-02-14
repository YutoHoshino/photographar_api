import { 
  useContext, 
  useEffect, 
  useReducer, 
  useState 
} from "react"

import styled from "styled-components";

// material
import {
  Avatar, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  Container, 
  Grid, 
  IconButton, 
  LinearProgress, 
  makeStyles, 
  Typography 
} from '@material-ui/core';

// material icon
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"
import MoreVertIcon from "@material-ui/icons/MoreVert";

// apis
import { postGetData } from "apis/post"

// reductor
import { postsReductor } from "reducers/postsReductor"

// useContext
import { PostContext } from "App";

// components
import { CommonLayout } from "components/Layout/CommonLayout";
import { PostActionModal } from "components/Modal/PostActionModal";
import { PostSwiper } from "components/Swiper/PostSwiper";

// interface
import { GetPostdata } from "interfaces"

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

// material css
const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  },
  card: {
    marginBottom: "3rem"
  },
  iconButton: {
    display: "none"
  }
}))

export const Posts = () => {

  const classes = useStyles()

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
    <CommonLayout>

      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent="center">
            <Grid item>
              {
                state.fetchState == "OK" && state.postList.posts != undefined ? 
                (
                  state.postList.posts.map((postdata: GetPostdata) => {
                    return (
                      <SCard 
                        key={postdata.post.id}>
          
                        <CardHeader
                          avatar={
                            postdata.user.image ? (
                              <Avatar
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
                            postdata.user.name
                          }
                          subheader={
                            postdata.post.created_at
                          }
                        />
                        
                        <PostSwiper postdata={postdata} />

                        <CardActions disableSpacing>
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

                        <CardContent>
                          
                          <STypography variant="body2" >
                            {postdata.post.caption}
                          </STypography>
                        </CardContent>
                  
                      </SCard>
                    )
                  })
                )
                :
                (
                  <>
                    <div>ロード中・・・</div>
                    <LinearProgress/>
                  </>
                )
              }
            </Grid>   
          </Grid>
        </Container>
      </main>


        {/* メニューモーダル */}
      {
        <PostActionModal
          isPostModal={isPostModal}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          postId={postId}
          setAnchorEl={setAnchorEl}
        />
      }

    </CommonLayout>
  )
}
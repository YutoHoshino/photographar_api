import { createContext, memo, useContext, useEffect, useReducer, useState } from "react"

// material
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"
import MoreVertIcon from "@material-ui/icons/MoreVert";

// apis
import { PostGetData } from "apis/post"

// reductor
import { postsReductor } from "reducers/postsReductor"
import { PrimaryHeader } from "components/Header/PrimaryHeader";
import { PostActionModal } from "components/Modal/PostActionModal";

// style css
const SCard = styled(Card)`
  max-width: 500px;
`

const STypography = styled(Typography)`
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  },
  card: {
    marginBottom: "3rem"
  }
}))

type Props = {
  post: {
    id: number,
    caption: string,
    user_id: number,
    deleted: Date,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date
  },
  photos: Array<{
      id: number,
      image?: {
        url: string
      },
      post_id: number,
      created_at: Date,
      updated_at: Date,
  }>,
  user: {
    id: number,
    name: string,
    email: string,
    image?: {
      url: string
    },
    created_at: Date,
    updated_at: Date,
  }
}

export const PostContext = createContext({} as {
  isCreatePost: boolean
  setIsCreatePost: React.Dispatch<React.SetStateAction<boolean>>
})

export const Post = () => {

  const classes = useStyles()

  // 投稿されたかどうかのuseStatue
  const [isCreatePost, setIsCreatePost] = useState(false);

  // 投稿内容取得
  const initialState = {
    fetchState: "INITIAL",
    postList: []
  }
  const [state, dispatch] = useReducer(postsReductor, initialState);
  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    PostGetData()
    .then((data) => {
      dispatch({ 
        type: 'FETCH_SUCCESS',
        payload: data,
      });
    })
    setIsCreatePost(false)
  }, [isCreatePost])

  // PostMenuモーダル表示
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
  }


  return(
    <>
      <header>
        <PostContext.Provider value={{ isCreatePost, setIsCreatePost }}>
          <PrimaryHeader />
        </PostContext.Provider>
      </header>

      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent="center">
            <Grid item>
              {
                state.fetchState == "OK" && state.postList.posts != undefined ? 
                (
                  state.postList.posts.map((postdata: Props) => {
                    return (
                      <SCard 
                        className={classes.card}
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
                              <IconButton aria-label="settings">
                                <MoreVertIcon onClick={handleMobileMenuOpen}/>
                                <PostActionModal 
                                  isPostModal={isPostModal}
                                  onClose={() => setAnchorEl(null)}
                                  anchorEl={anchorEl}
                                />
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
                        
                        {postdata.photos[0].image ?
                          <CardMedia
                            component="img"
                            height="400"
                            image={postdata.photos[0].image.url}
                          /> : null
                        }

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
    </>
  )
}
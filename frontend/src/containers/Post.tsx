import { useContext, useEffect, useReducer, useState } from "react"

// material
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from "styled-components";

// useContext
import { AuthContext } from "App"

// apis
import { PostGetData } from "apis/post"

// reductor
import { postsReductor } from "reducers/postsReductor"
import { PrimaryHeader } from "components/Header/PrimaryHeader";

// style css
const SCard = styled(Card)`
  max-width: 345px;
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

export const Post = () => {

  const classes = useStyles()

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
  }, [])



  return(
    <>
      <header>
        <PrimaryHeader />
      </header>

      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent="center">
            <Grid item>
              {
                state.fetchState == "OK" ? 
                (
                  state.postList.posts.map((postdata: Props) => {
                    return (
                      <Card 
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
                            <IconButton aria-label="settings"><>:</></IconButton>
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

                  
                        <CardContent>
                          
                          <Typography variant="body2">
                            {postdata.post.caption}
                          </Typography>
                        </CardContent>
                  
                      </Card>
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
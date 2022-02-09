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
  }
}))

type Props = {
    id: number,
    caption: string,
    user_id: number,
    deleted: Date,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date
}

export const Post = () => {

  const classes = useStyles()

  const { currentUser, isSignedIn } = useContext(AuthContext)

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

  console.log(state.fetchState)

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
                  state.postList.posts.map((post: Props) => {
                    return (
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar
                              alt="Ted talk"
                              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                            />
                          }
                          action={
                            <IconButton aria-label="settings"><>:</></IconButton>
                          }
                          title={
                            post.caption
                          }
                          subheader={
                            '5 hours ago'
                          }
                        />
                  
                        <CardMedia
                          component="img"
                          height="400"
                          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                          alt="Nicola Sturgeon on a TED talk stage"
                        />
                  
                        <CardContent>
                          <Typography variant="body2">
                            "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"  
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
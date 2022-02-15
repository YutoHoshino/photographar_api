import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//material
import { 
  makeStyles, 
  Theme,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  LinearProgress
} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// useContext
import { AuthContext } from "App";

// components
import { CommonLayout } from "components/Layout/CommonLayout";
import { LoadLayout } from "components/Layout/LoadLayout";

// api
import { userShowData } from "apis/user";

// intarface
import { GetUserShowData } from "interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  ImageGrid:{
    padding: "10px"
  },
  CardContent: {
    display: "flex", justifyContent: "space-between"
  },
  EditButton: {
    marginLeft: "15px"
  },
  ImageListItem: {
    cursor: "pointer"
  }
}))


export const UserProfile = ({match}:any) => {

  const history = useHistory();

  const classes = useStyles();

  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)
  
  const [user, setUser] = useState<GetUserShowData>()

  useEffect(() => {
    if (currentUser) {
      const params = {name: match.params.userName}
      userShowData(params)
      .then((data) => {
        setUser(data.user)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },[currentUser])
  
  console.log(user)


  return (
    <>
      {
        user  ?
          <CommonLayout>
            <Box className={classes.root}>
              <Grid className={classes.ImageGrid}>
                <Avatar
                  alt={user.user.name}
                  src={user.user.image?.url}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid >
                <CardContent className={classes.CardContent}>
                  <Typography variant="h5">{user.user.name}</Typography>
                  <Button variant="outlined" className={classes.EditButton}>プロフィール修正</Button>
                  <Button><SettingsIcon/></Button>
                </CardContent>
                <CardActions>
                  <div>
                    投稿{user.posts.length}件
                  </div>
                  <Button>
                    フォロワー0人
                  </Button>
                  <Button>
                    フォロー0人
                  </Button>
                </CardActions>
              </Grid>
            </Box>

            <Box></Box>

            <Box>
              <ImageList
                sx={{ height: 450 }}
                variant="quilted"
                cols={3}
                rowHeight={120}
              >
                {user.posts.map((post) => (
                  <ImageListItem 
                    key={post.post.id}
                    className={classes.ImageListItem}
                    onClick={() => {history.push(`/post/${post.post.id}`)}}
                  >
                    <img src={post.photos[0].image?.url} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>

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
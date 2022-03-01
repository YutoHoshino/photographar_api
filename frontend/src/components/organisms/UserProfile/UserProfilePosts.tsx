import { useHistory } from "react-router-dom";
import styled from "styled-components";

//material
import Box from "@material-ui/core/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// interface
import { UserData } from "interfaces/data/UserData";

const ImageItem = styled(ImageListItem)`
  cursor: pointer;
  border: 1px solid #e4e4e4;
`

interface Props {
  UserData: UserData
  action: "ALL" | "LIKE"
}

export const UserProfilePosts = (props: Props) => {

  const { UserData, action } = props

  const history = useHistory();

  return (
   <Box>
      <ImageList
        variant="quilted"
        cols={3}
      >

        {
          action == "ALL" ?
          UserData.posts.map((post) => (
            <ImageItem
              key={post.post.id}
              onClick={() => {history.push(`/post/${post.post.id}`)}}
              sx={{maxWidth: {xs: "120px", md: "300px"},maxHeight: {xs: "120px", md: "300px"}}}
            >
              <img src={post.photos[0].image?.url}/>
            </ImageItem>
          ))
          :
          UserData.like_posts.map((post) => (
            <ImageItem
              key={post.post.id}
              onClick={() => {history.push(`/post/${post.post.id}`)}}
              sx={{maxWidth: {xs: "120px", md: "300px"},maxHeight: {xs: "120px", md: "300px"}}}
            >
              <img src={post.photos[0].image?.url}/>
            </ImageItem>
          ))
        }

      </ImageList>
   </Box>
  )
}
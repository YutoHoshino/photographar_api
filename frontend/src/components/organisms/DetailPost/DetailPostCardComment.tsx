import styled from "styled-components";
import Grid from '@mui/material/Grid';
import {  
  Avatar, 
  ListItem, 
  ListItemAvatar, 
  ListItemText 
} from '@material-ui/core';

// atom
import { PrimarySpan } from "components/atoms/Span/PrimarySpan";

// interface
import { PostData } from 'interfaces/data/PostData';

// style css
const CommentList = styled(Grid)`
  padding: 16px;
  maxHeight: 280px;
  overflow: scroll;
  overflow-wrap: break-word;
`

interface Props {
  PostData: PostData
}

export const DetailPostCardComment = (props: Props) => {

  const { PostData } = props 

  return (
    <CommentList
    sx={{
      height: { md: "280px;"},
    }}>

      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={PostData.user.name}
            src={PostData.user.image?.url}
          />
        </ListItemAvatar>
  
        <ListItemText
          primary={
            <PrimarySpan>
              {PostData.user.name}
            </PrimarySpan>

          }
          secondary={
            <PrimarySpan>
              {PostData.post.caption}
            </PrimarySpan>
          }
        />
      </ListItem>

      {
        PostData.comments.length == 0 ?
        null
        :
        PostData.comments.map((comment) => 

          <ListItem key={comment.id}>
            <ListItemAvatar>
              <Avatar
                alt={comment.user.name}
                src={comment.user.image?.url}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <PrimarySpan>
                  {comment.user.name}
                </PrimarySpan>
              }
              secondary={
                <PrimarySpan>
                  {comment.text}
                </PrimarySpan>
              }
            />
          </ListItem>
       ) 
      }

    </CommentList>
  )
}
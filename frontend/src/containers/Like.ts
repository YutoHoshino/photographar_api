//apis
import { likeCreate, likeDelete } from "apis/like";

// interface
import { LikeProps } from "interfaces";

export const handleLikes = (params: LikeProps) => {
  const {postId , e } = params
    
  const targetElement = e.target.parentNode
  const liked = targetElement.id == "liked"

  const data = { post_id: postId}
  

  if (liked) {
    likeDelete(data)
    .then(() => {
      targetElement.id = ""
    })
  } else {
    likeCreate(data)
    .then(() => {
      targetElement.id = "liked"
    })
  }
}
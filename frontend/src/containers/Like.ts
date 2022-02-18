//apis
import { likeCreate, likeDelete } from "apis/like";

// interface
import { LikeProps } from "interfaces";

export const handleLikes = (params: LikeProps) => {

  const { postId, likesCount, e } = params
    
  const likeElement = e.target.parentNode
  const liked = likeElement.id == "liked"

  const data = { post_id: postId }

  const likeCountElement: HTMLInputElement =<HTMLInputElement>document.getElementById(`like-count-${postId}`)

  if (liked) {
    likeDelete(data)
    .then(() => {
      likeElement.id = ""

      const text = likesCount == (0 || 1) ? null : `${likesCount - 1}件のいいね`
      likeCountElement.textContent = text
    })
    return likesCount - 1

  } else {
    likeCreate(data)
    .then(() => {
      likeElement.id = "liked"

      likeCountElement.textContent = `${likesCount + 1}件のいいね`
    })
    return likesCount + 1
  }  
}
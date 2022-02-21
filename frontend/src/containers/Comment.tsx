// apis
import { commentCreate } from "apis/comment";

// interface
import { CommentProps } from "interfaces/comment";

export const handleComments = (props: CommentProps) => {

  const { comment, postId } = props

  const data = {postId: postId, comment: comment}

  commentCreate(data)
  .then((data) => {
    const p = document.createElement("p");
    p.className = 'MuiTypography-root sc-feYDSs ccCrLm MuiTypography-body2';
    p.innerHTML=`<strong>${data.user.name}</strong> ${data.comment.text}`;
    const commentElement = document.getElementById(`comment-${postId}`)
    if (commentElement) commentElement.appendChild(p);
  })
  .catch((error) => {
    console.log(error)
  })
}

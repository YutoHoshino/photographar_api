// apis
import { commentCreate } from "apis/comment";
import { postShowData } from "apis/post";

// interface
import { CommentProps } from "interfaces/comment";

// 投稿一覧画面よう
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

// 詳細画面
export const handleComment = (props: CommentProps) => {

  const { comment, postId, setPost } = props

  const data = {postId: postId, comment: comment}

  commentCreate(data)
  .then((data) => {
    postShowData({id: postId})
    .then((data) => {
      setPost(data.post)
    })
  })
  .catch((error) => {
    console.log(error)
  })
}

// apis
import { commentCreate } from "apis/comment";
import { postShowData } from "apis/post";

// interface
import { CommentHook } from "interfaces/hooks/CommentHook";

// 一覧画面用
export const UseComments = (props: CommentHook) => {

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

// 詳細画面用
export const UseComment = (props: CommentHook) => {

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

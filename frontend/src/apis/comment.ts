//client
import { client } from './client';

// interface
import { CommentProps } from "interfaces/comment"

export const commentCreate = async (params: CommentProps) => {
  return await client.post(`posts/${params.postId}/comments`, params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}


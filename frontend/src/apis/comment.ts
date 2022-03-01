//client
import { client } from './client';

interface Props {
  comment: String,
  postId: number,
  setPost?: any,
}

export const commentCreate = async (params: Props) => {
  return await client.post(`posts/${params.postId}/comments`, params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}


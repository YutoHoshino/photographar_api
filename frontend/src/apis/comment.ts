//client
import { client } from './client';

//interface
import { CommentApi } from 'interfaces/apis/CommentApi';

export const commentCreate = async (params: CommentApi) => {
  return await client.post(`posts/${params.postId}/comments`, params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}


//client
import { client } from './client';

// interface
import { LikeApi } from 'interfaces/apis/LikeApi';

// いいねつける
export const  likeCreate = async (params: LikeApi) => {
  return await client.post(`posts/${params.post_id}/likes`)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// いいね削除
export const  likeDelete = async (params: LikeApi) => {
  return await client.delete(`posts/${params.post_id}/likes/0`)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}


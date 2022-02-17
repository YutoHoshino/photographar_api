//client
import { client } from './client';

// interface
import { LikeIdProps } from "interfaces"

// いいねつける
export const  likeCreate = async (params: LikeIdProps) => {
  return await client.post(`posts/${params.post_id}/likes`)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// いいね削除
export const  likeDelete = async (params: LikeIdProps) => {
  return await client.delete(`posts/${params.post_id}/likes/0`)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}


//client
import { client } from './client';

//interface
import { FollowApi } from 'interfaces/apis/FollowApi';

// フォローする
export const followCreate = async (params: FollowApi) => {
  return await client.post(`users/${params.UserId}/relationships`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// フォローを外す
export const followDelete = async (params: FollowApi) => {
  return await client.delete(`users/${params.UserId}/relationships`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// フォロワー取得
export const followers =  async (params: FollowApi) => {
  return await client.get(`users/${params.UserId}/followers`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// フォロー取得
export const followings =  async (params: FollowApi) => {
  return await client.get(`users/${params.UserId}/followings`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

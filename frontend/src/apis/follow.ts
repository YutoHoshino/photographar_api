//client
import { client } from './client';

//interface
import { FollowApi } from 'interfaces/apis/FollowApi';

export const followCreate = async (params: FollowApi) => {
  return await client.post(`users/${params.UserId}/relationships`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

export const followDelete = async (params: FollowApi) => {
  return await client.delete(`users/${params.UserId}/relationships`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
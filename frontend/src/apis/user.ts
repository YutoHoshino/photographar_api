//client
import { client } from './client';

// ユーザー詳細
export const userShowData = async (params: any) => {
  return await client.get(`/users/${params.name}`)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// ユーザー修正
export const  userEdit = async (params: any) => {
  return await client.put(`/users/${params.name}`, params.data)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

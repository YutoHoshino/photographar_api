//client
import { client } from './client';

// interface
import { PostData } from 'interfaces';

// サインアップ
export const postCreate = async (params: any) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return await client.post("post", params, config)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
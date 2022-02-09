//client
import { client } from './client';

// interface
import { PostData } from 'interfaces';

// 投稿作成
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

// 投稿一覧を取得する
export const PostGetData = async () => {
  return await client.get("posts")
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
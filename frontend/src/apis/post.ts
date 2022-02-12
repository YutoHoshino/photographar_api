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
  return await client.post("posts", params, config)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// 投稿一覧を取得する
export const postGetData = async () => {
  return await client.get("posts")
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// 投稿削除
export const postDelete = async (params: any) => {
  return await client.delete("posts", params)
  .then(res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
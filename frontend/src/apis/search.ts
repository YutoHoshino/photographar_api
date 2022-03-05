//client
import { client } from './client';

// interface
import { SearchApi } from 'interfaces/apis/SearchApi';

// 投稿作成
export const searchUser = async (params: SearchApi) => {
  return await client.get(`search/${params.keyword}`)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

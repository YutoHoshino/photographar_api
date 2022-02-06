//client
import { client } from './client';

// interface
import { SignUpData } from 'interfaces';

// サインアップ
export const siginUp = async (params: SignUpData) => {
  return await client.post("signup", params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// ユーザ情報取得
export const getCurrentUser = async () => {
  return await client.get("logged")
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
//client
import { client } from './client';

// interface
import { SignInApi } from 'interfaces/apis/SignInApi';
import { SignUpApi } from 'interfaces/apis/SignUpApi';


// サインアップ
export const signUp = async (params: SignUpApi) => {
  return await client.post("signup", params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// サインイン
export const signIn = async (params: SignInApi) => {
  return await client.post("signin", params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// ログアウト
export const signOut = async () => {
  return await client.delete("signout")
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
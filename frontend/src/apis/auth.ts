//client
import { client } from './client';

// interface
import { SignUpData, SignInData } from 'interfaces';


// サインアップ
export const siginUp = async (params: SignUpData) => {
  return await client.post("signup", params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// サインイン
export const siginIn = async (params: SignInData) => {
  return await client.post("signin", params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// ユーザ情報取得
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
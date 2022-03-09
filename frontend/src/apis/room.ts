//client
import { client } from './client';

// カレントユーザーのルームを取得する
export const RoomAll = async () => {
  return await client.get('rooms')
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}

// ルーム表示、まだなかった場合は作成
export const  CreateRoom = async (params: {UserId: number}) => {
  return await client.post(`rooms`, params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
} 
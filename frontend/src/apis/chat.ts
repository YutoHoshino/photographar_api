//client
import { client } from './client';

// interface
import { ChatApi } from 'interfaces/apis/ChatApi';

// チャット送信
export const  CreateChat = async (params: ChatApi) => {
  return await client.post(`chats`, params)
  .then( res => {
    return res.data
  })
  .catch ((e) => console.error(e))
}
import { Chat } from "interfaces/get/Chat";
import { User } from "interfaces/get/User";

export interface ChatData {
  chats: Array<Chat>
  partner: User
}
import { User } from "interfaces/get/User";

export interface Chat {
  id: number
  message: string
  user_id: number
  room_id: number
  created_at: Date
  updated_at: Date
  user: User
}
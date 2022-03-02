import { User } from "./User";

export interface CurrentUser {
  id: number,
  name: string,
  email: string,
  image: { url?: string },
  created_at: Date,
  updated_at: Date,
  followers: Array<User>,
  followings: Array<User>,
}
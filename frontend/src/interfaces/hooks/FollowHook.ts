//interface
import { User } from "interfaces/get/User";

export interface FollowHook {
  User: User
  e: any
  setIsFollowed: any
  isFollowed: boolean
}
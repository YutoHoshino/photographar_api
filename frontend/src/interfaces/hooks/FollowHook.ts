//interface
import { User } from "interfaces/get/User";

export interface FollowHook {
  OtherUser: User
  e: any
  setIsFollowed: any
  isFollowed: boolean
}
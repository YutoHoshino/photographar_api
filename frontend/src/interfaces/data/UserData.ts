import { Post } from "interfaces/get/Post";
import { User } from "interfaces/get/User";
import { Photo } from "interfaces/get/Photo";

export interface UserData {
  user: User
  posts: Array<{
    post: Post
    photos: Array<Photo>
  }>,
  like_posts: Array<{
    post: Post
    photos: Array<Photo>
  }>
}
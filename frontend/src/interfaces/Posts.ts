import { Post } from "interfaces/get/Post";
import { User } from "interfaces/get/User";
import { Like } from "interfaces/get/Like";
import { Comment } from "interfaces/get/Comment";
import { Photo } from "interfaces/get/Photo";

export interface PostData {
  post: Post
  photos: Array<Photo>
  user: User
  likes: Array<Like>
  comments: Array<Comment>
}
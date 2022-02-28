import { Post } from "interfaces/apis/Post";
import { User } from "interfaces/apis/User";
import { Like } from "interfaces/apis/Like";
import { Comment } from "interfaces/apis/Comment";
import { Photo } from "interfaces/apis/Photo";

export interface PostData {
  post: Post
  photos: Array<Photo>
  user: User
  likes: Array<Like>
  comments: Array<Comment>
}
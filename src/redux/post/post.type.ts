import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";

export interface Post extends baseMongooseType {
  id: string;
  title: string;
  text: string;
  user: User;
  likes: [];
  comments: [];
}

export interface PostState extends baseState {
  allPosts: Post[];
  singlePost: Post;
}

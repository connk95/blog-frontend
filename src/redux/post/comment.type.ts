import { baseMongooseType } from "../types";
import { User } from "../user/user.type";
import { Post } from "./post.type";

export interface Comment extends baseMongooseType {
  id: string;
  text: string;
  user: User;
  likes: User[];
}

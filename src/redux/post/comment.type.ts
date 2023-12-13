import { baseMongooseType } from "../types";
import { User } from "../user/user.type";

export interface Comment extends baseMongooseType {
  text: string;
  postId: string;
  user: User;
  likes?: User[];
}

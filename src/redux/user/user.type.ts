import { Post } from "../post/post.type";
import { baseState } from "../types";

export interface User {
  username: string;
  password: string;
  email: string;
  posts?: Post[];
  likes?: [];
  comments?: [];
}

export interface UserState extends baseState {
  user: User;
}

// export interface NewUser {
//   username: string;
//   password: string;
//   email: string;
// }

// export interface UserState extends baseState {
//   loggedInUser: User;
//   newUser: NewUser;
// }

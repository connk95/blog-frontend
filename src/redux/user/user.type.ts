import { baseMongooseType, baseState } from "../types";

export interface User extends baseMongooseType {
  username: string;
  password: string;
  emaik: string;
  posts: [];
  likes: [];
  comments: [];
}

export interface UserState extends baseState {
  loggedInUser: object;
}

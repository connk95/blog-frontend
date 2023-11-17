import { baseState } from "../types";

export interface User {
  username: string;
  password: string;
  email: string;
  posts?: [];
  likes?: [];
  comments?: [];
}

export interface NewUser {
  username: string;
  password: string;
  email: string;
}

export interface UserState extends baseState {
  loggedInUser: User;
  newUser: NewUser;
}

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../user/user.type";
import { UserLoginData } from "./auth.type";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ username, password }: UserLoginData) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      throw { message: "Failed to log in", originalError: error };
    }
  }
);

export const setLoggedInUser = createAsyncThunk(
  "auth/setLoggedInUser",
  async () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const loggedInUser = JSON.parse(user);
      return loggedInUser;
    } else {
      return;
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async ({ username, password }: UserLoginData) => {
    localStorage.removeItem("loggedInUser");
    try {
      const res = await axios.post("http://localhost:3000/auth/logout", {
        username,
        password,
      });
      return res;
    } catch (error) {
      throw { message: "Failed to log in", originalError: error };
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ username, email, password }: User) => {
    const res = await axios.post("http://localhost:3000/users", {
      username,
      email,
      password,
    });

    return res.data;
  }
);

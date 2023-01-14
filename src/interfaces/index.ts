import { Request } from "express";

export interface IUser {
  email: string;
  password: string;
}

export interface ITodo {
  userId: string;
  title: string;
  description: string;
}

export interface TodoRequest extends Request {
  body: {
    title: string;
    description: string;
  };
  params: {
    todoId: string;
  };
}

export interface UserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

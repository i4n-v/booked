import { IChat } from "./Chat";

interface UserCommom {
  email?: string;
}

interface UserCreate extends UserCommom {
  name: string;
  birth_date: string;
  password: string;
  confirm_password: string;
}

interface UserLogin {
  user_login: string;
  password: string;
}

interface User extends UserCommom {
  name: string;
  birth_date: Date | string;
  id?: string;
  user_name: string;
  photo_url?: string;
  description?: string;
  total_books?: number;
  total_acquitions?: number;
  total_followers?: number;
  chats?: IChat[];
  followed: boolean;
}

interface UserUpdate extends User {
  photo: File;
}

enum UserTypes {
  CREATE,
  LOGIN,
  AUTHDATA,
  UPDATE,
}
interface UserAuthData extends UserCommom, User {
  token: string;
}

type IUser<T extends keyof typeof UserTypes | null = null> = T extends "CREATE"
  ? UserCreate
  : T extends "LOGIN"
    ? UserLogin
    : T extends "AUTHDATA"
      ? UserAuthData
      : T extends "UPDATE"
        ? UserUpdate
        : User;

export default IUser;

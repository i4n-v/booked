interface UserCommom {
  email?: string;
}

interface UserCreate extends UserCommom {
  name: string;
  birth_date: Date;
  password: string;
  confirm_password: string;
}

interface UserLogin {
  user_login: string;
  password: string;
}

interface User extends UserCommom {
  name: string;
  birth_date: Date;
  id?: string;
  user_name: string;
}

interface UserUpdate extends User {
  description: string;
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

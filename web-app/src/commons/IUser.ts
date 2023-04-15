interface UserCommom {
  email: string;
}

interface UserCreate extends UserCommom {
  name: string;
  birth_date: Date;
  password: string;
  confirm_password: string;
}

interface UserLogin extends UserCommom {
  password: string;
}

interface User extends UserCommom {
  name: string;
  birth_date: Date;
}

enum UserTypes {
  CREATE,
  LOGIN,
}

export type IUser<T extends keyof typeof UserTypes | null = null> =
  T extends "CREATE" ? UserCreate : T extends "LOGIN" ? UserLogin : User;

export default IUser;

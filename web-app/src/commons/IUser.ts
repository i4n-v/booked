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
  AUTHDATA,
}
interface UserAuthData extends UserCommom {
  id: string;
  token: string;
  user_name: string;
}

type IUser<T extends keyof typeof UserTypes | null = null> = T extends "CREATE"
  ? UserCreate
  : T extends "LOGIN"
  ? UserLogin
  : T extends "AUTHDATA"
  ? UserAuthData
  : User;

export default IUser;

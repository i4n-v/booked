export default class UserCreateDto {
  name: string;
  user_name: string;
  birth_date: Date;
  email: string;
  password: string;
  salt: string;
  confirm_password: string;
}

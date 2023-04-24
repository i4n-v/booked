export default class UserCreateDto {
  name?: string;
  user_name?: string;
  birth_date?: Date;
  email?: string;
  description?: string;
  photo?: string;
  photo_url?: string;
  previous_password?: string;
  password?: string;
  confirm_password?: string;
  salt?: string;
}

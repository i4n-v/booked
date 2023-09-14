export default class UserDto {
  id: string;
  name: string;
  online: boolean;
  user_name: string;
  email: string;
  password: string;
  birth_date: Date;
  photo_url: string | null;
  description: string;
}

export default class UserUpdateDto {
  name?: string;
  online?: boolean;
  user_name?: string;
  birth_date?: Date;
  email?: string;
  description?: string;
  photo_url?: string | null;
  photo?: string | null;
}

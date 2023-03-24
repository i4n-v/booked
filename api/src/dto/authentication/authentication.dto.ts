export default class AuthenticationDto {
  id: string;
  token: string;
  valid: boolean;
  expiry_date: Date;
  user_id: string;
}

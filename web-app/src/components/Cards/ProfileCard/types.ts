export type ProfileCardProps = {
  id: string;
  name: string;
  user_name: string;
  photo_url?: string;
  description?: string;
  followed: boolean;
  onClick?: () => void;
};

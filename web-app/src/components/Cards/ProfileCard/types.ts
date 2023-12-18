export type ProfileCardProps = {
  size: "lg" | "md";
  id?: string;
  name: string;
  user_name: string;
  photo_url?: string;
  description?: string;
  onClick?: () => void;
};
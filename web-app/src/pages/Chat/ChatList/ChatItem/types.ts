export interface ChatItemProps {
  active: boolean;
  username: string;
  last_message?: string;
  unread_messages?: number;
  last_update?: Date;
  group?: boolean;
  onClick: () => void;
  profile_photo: string;
}

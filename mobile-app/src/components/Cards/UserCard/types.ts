type UserCardProps = {
  name: string;
  userName: string;
  isFollowing: boolean;
  image?: string;
  onPress?: () => void;
  onFollow?: () => void;
};

export { UserCardProps };

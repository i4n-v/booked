import { ViewStyle } from "react-native";

type BookCardProps = {
  title: string;
  author: string;
  price?: number | null;
  wished?: boolean;
  rating: number;
  ratingQuantity: number;
  image?: string | null;
  onPress?: () => void;
};

export { BookCardProps };

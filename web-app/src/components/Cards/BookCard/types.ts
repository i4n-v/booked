import { DropdownOptions } from "../../Dropdown/type";

export type BookCardProps = {
  size: "lg" | "md";
  bookId?: string;
  title: string;
  author: string;
  price?: number | null;
  showPrice?: boolean;
  showWishe?: boolean;
  wished?: boolean;
  rating: number;
  ratingQuantity: number;
  image?: string | null;
  actionsOptions?: DropdownOptions[];
  onClick?: () => void;
};

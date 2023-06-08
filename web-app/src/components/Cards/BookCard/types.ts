import { DropdownOptions } from "../../Dropdown/type";

export type BookCardProps = {
  size: "lg" | "md";
  title: string;
  author: string;
  price?: number | null;
  rating: number;
  ratingQuantity: number;
  image?: string | null;
  actionsOptions?: DropdownOptions[]
};

import { ICategory } from "./ICategory";
import IUser from "./IUser";

export interface IAcquisitions {
  id?: string;
  name: string;
  description: string;
  price: number;
  categories: ICategory[];
  free: boolean;
  file_url: string;
  photo_url: string;
  user: IUser;
  rating: number;
  total_users_rating: number;
}

import { ICategory } from "./ICategory";

export interface IWishes {
    id: string;
    name: string;
    description: string;
    price: number;
    photo_url: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
    total_users_rating: number;
    categories: ICategory[];
}
  
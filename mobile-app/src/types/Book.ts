import IAssessment from "./Assessment";
import { ICategory } from "./Category";
import IUser from "./User";

type Book = {
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
  acquisition_id?: string;
  marked_page?: number;
  wished: boolean;
  user_raters?: {
    id: string;
    assessment: IAssessment;
  }[];
};

interface BookCreate
  extends Omit<
    Book,
    | "file_url"
    | "photo_url"
    | "id"
    | "user"
    | "rating"
    | "total_users_rating"
    | "user_raters"
    | "marked_page"
  > {
  photo: File;
  file: File;
  user_id: string;
}

interface BookUpdate extends BookCreate {
  id: string;
}

enum BookTypes {
  CREATE,
  UPDATE,
}

type IBook<T extends keyof typeof BookTypes | null = null> = T extends "CREATE"
  ? BookCreate
  : T extends "UPDATE"
    ? BookUpdate
    : Book;

export default IBook;

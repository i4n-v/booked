export default class BookCreateDto {
  name: string;
  description: string;
  price: number;
  free_pages?: number;
  photo?: string;
  photo_url?: string;
  file?: string;
  file_url: string;
  user_id: string;
  categories?: string[];
}

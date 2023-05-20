export default class BookCreateDto {
  name: string;
  description: string;
  price: number;
  photo?: string;
  photo_url?: string;
  file?: string;
  file_url: string;
  user_id: string;
}

export default class BookUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  free_pages?: number;
  photo?: string;
  photo_url?: string;
  file?: string;
  file_url?: string;
  categories?: string[];
}

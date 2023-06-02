export default class CommentCreateDto {
  user_id: string;
  book_id?: string;
  refered_by?: string;
  comment_id?: string;
  description: string;
}

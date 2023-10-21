export default class SolicitationCreateDto {
  user_id: string;
  book_id: string;
  status: 'pending' | 'canceled' | 'accepted' | 'refused';
}

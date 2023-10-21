export default class SolicitationDto {
  id: string;
  status: 'pending' | 'canceled' | 'accepted' | 'refused';
  user_id: string;
  book_id: string;
}

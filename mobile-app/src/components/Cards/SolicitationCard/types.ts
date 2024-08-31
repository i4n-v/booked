import { ISolicitationStatus } from "@/types/Solicitation";

type User = {
  id: string;
  name: string;
  user_name: string;
};
type Book = {
  id: string;
  name: string;
  user: User;
};

type SolicitationCardProps = {
  id: string;
  status: ISolicitationStatus;
  book: Book;
  user: User;
};

export { SolicitationCardProps };

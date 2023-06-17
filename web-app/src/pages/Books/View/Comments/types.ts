import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import IUser from "../../../../commons/IUser";



type CommentCommom = {
  description: string;
}
interface Comment extends CommentCommom {
  id?: string;
  user?: IUser;
  book_id?: string;
  refered_by?: string;
}

interface CommentCreate extends CommentCommom {
  book_id?: string;
}

interface CommentAnswerCreate extends CommentCommom {
  comment_id?: string;
}

interface CommentUpdate extends CommentAnswerCreate {

}

enum UserTypes {
  CREATE,
  RESPONSE,
  UPDATE
}


export type IComment<T extends keyof typeof UserTypes | null = null> = T extends "CREATE"
  ? CommentCreate
  : T extends "RESPONSE"
  ? CommentAnswerCreate
  : T extends "UPDATE"
  ? CommentUpdate
  : Comment;

export type CommentsContainerProps = {
  bookId?: string;
  bookName?: string;
}

export interface CommentsPros extends Comment {
  openAnswer?: React.Dispatch<React.SetStateAction<ToOpenForm | undefined>>
  refetchFn?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  answer?: boolean;
}


export type ToOpenForm = {
  bookId?: string,
  commentId?: string,
  description?: string,
  refetchFn?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}
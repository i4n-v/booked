interface ICommentCardProps<T> {
  data: T;
  isResponse?: boolean;
  onResponse?(data: T): void;
  onEdit?(data: T): void;
  onDelete?(data: T): void;
}

export { ICommentCardProps };

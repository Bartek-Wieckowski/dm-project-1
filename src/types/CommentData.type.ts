export interface CommentsProps {
  comments: Comment[];
}

export interface Comment {
  comment: string;
  username: string;
  subComments?: SubComment[];
}

export interface SubComment {
  comment: string;
  username: string;
  subComments?: SubComment[];
}

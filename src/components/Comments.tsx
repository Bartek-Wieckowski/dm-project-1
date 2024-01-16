import React from "react";
import { Comment, CommentsProps } from "../types/CommentData.type";
import { BsArrow90DegDown } from "react-icons/bs";

export default function Comments({ comments }: CommentsProps): React.ReactElement {
  return (
    <div className="text-stone-200 w-full space-y-4 sm:pl-8">
      {comments.map((comment: Comment) => (
        <div key={comment.username} className="border p-4 rounded shadow-md">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold mb-2">{comment.username}</h2>
            {comment.subComments && <BsArrow90DegDown />}
          </div>
          <p className="mb-4">{comment.comment}</p>
          <div>{comment.subComments && <Comments comments={comment.subComments} />}</div>
        </div>
      ))}
    </div>
  );
}

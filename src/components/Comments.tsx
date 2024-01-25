import { useState } from "react";
import { Comment, CommentsProps } from "../types/CommentData.type";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";

export default function Comments({ comments }: CommentsProps): React.ReactElement {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (username: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };
  return (
    <div className="w-full space-y-4 text-stone-200 sm:pl-8">
      {comments.map((comment: Comment) => (
        <div key={comment.username} className="rounded border p-4 shadow-md">
          <div className="flex items-center gap-4">
            <h2 className="mb-2 text-lg font-bold">{comment.username}</h2>
            {comment.subComments && (
              <div onClick={() => handleToggle(comment.username)} style={{ cursor: "pointer" }}>
                {openStates[comment.username] ? <BsArrow90DegUp /> : <BsArrow90DegDown />}
              </div>
            )}
          </div>
          <p className="mb-4">{comment.comment}</p>
          <div>
            {comment.subComments && openStates[comment.username] && (
              <Comments comments={comment.subComments} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

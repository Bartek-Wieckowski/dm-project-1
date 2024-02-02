import { Post as PostType } from "../../types/Post.type";

Post;
export default function Post({ id, title, body }: PostType) {
  return (
    <div className="mx-auto w-full max-w-[350px] border border-stone-400 p-2 text-slate-900 dark:text-stone-200" key={id}>
      <h2 className="mb-4 font-bold">{title}</h2>
      <p>{body}</p>
    </div>
  );
}

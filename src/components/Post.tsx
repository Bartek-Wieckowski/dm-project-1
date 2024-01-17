import { Post as PostType } from '../types/Post.type';

Post;
export default function Post({ post }: { post: PostType }) {
  return (
    <div
      className="mx-auto w-full max-w-[350px] border border-stone-400 p-2 text-stone-200"
      key={post.id}
    >
      <h2 className="mb-4 font-bold">{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

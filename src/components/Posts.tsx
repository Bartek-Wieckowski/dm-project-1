import { useEffect, useState } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = (await res.json()) as Post[];
        setPosts(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchPosts();

    void fetchPosts();
  }, []);

  return (
    <div>
      {isLoading && <p className="text-center text-stone-200">Loading...</p>}
      {isError && (
        <p className="text-center text-stone-200">Error loading posts.</p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {posts.map((post) => (
          <div
            className="mx-auto w-full max-w-[350px] border border-stone-400 p-2 text-stone-200"
            key={post.id}
          >
            <h2 className="mb-4 font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

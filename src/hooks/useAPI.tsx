import { useState, useEffect } from 'react';
import { Post as PostType } from '../types/Post.type';

type apiUrl = string;

export default function useAPI(url: apiUrl) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, { signal });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = (await res.json()) as PostType[];
        setPosts(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { posts, isLoading, isError };
}

import { useEffect, useState } from 'react';
import { Post as PostType } from '../types/Post.type';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Post from './Post';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_PER_PAGE = 4;

export default function Posts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
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

    // fetchPosts();

    void fetchPosts();
  }, []);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const slicedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  console.log(slicedPosts);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div>
      {isLoading && <p className="text-center text-stone-200">Loading...</p>}
      {isError && (
        <p className="text-center text-stone-200">Error loading posts.</p>
      )}
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
        {slicedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* //TODO: tutaj gdyby więcej czasu było to do zrobienia oddzielny komponent paginacji i komponent do buttonów */}
      <div className="mt-4 flex items-center justify-center gap-8">
        <button
          className={`rounded-md bg-teal-400 p-4 text-black ${
            currentPage === 1 ? 'opacity-50' : ''
          }`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>
        <button
          className={`rounded-md bg-teal-400 p-4 text-black ${
            endIndex >= posts.length ? 'opacity-50' : ''
          }`}
          onClick={handleNextClick}
          disabled={endIndex >= posts.length}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
}

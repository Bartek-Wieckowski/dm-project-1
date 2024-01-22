import { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Post from "./Post";
import useAPI from "../../hooks/useAPI";
import { Post as PostType } from "../../types/Post.type";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const POSTS_PER_PAGE = 4;

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isError, isLoading } = useAPI<PostType[]>(BASE_URL);

  if (!posts) {
    return (
      <>
        <p className="text-center text-stone-200 text-5xl">Wystapił błąd z url.</p>
      </>
    );
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const slicedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div>
      {isLoading && <p className="text-center text-stone-200">Loading...</p>}
      {isError && <p className="text-center text-stone-200">Błąd ładowania</p>}
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
        {slicedPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* //TODO: tutaj gdyby więcej czasu było to do zrobienia oddzielny komponent paginacji i komponent do buttonów */}
      <div className="mt-4 flex items-center justify-center gap-8">
        <button
          className={`rounded-md bg-teal-400 p-4 text-black ${currentPage === 1 ? "opacity-50" : ""}`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>
        <button
          className={`rounded-md bg-teal-400 p-4 text-black ${endIndex >= posts.length ? "opacity-50" : ""}`}
          onClick={handleNextClick}
          disabled={endIndex >= posts.length}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
}

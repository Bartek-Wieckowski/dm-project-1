import { useState, useEffect} from "react";

type UseApiResponse<T> =
  | {
      data: null;
      isLoading: true;
      isError: false;
    }
  | {
      data: null;
      isLoading: false;
      isError: true;
    }
  | {
      data: T | null;
      isLoading: boolean;
      isError: boolean;
    };

export default function useAPI<T>(url: string): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }

        const result = (await res.json()) as T;
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error during fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error("Error during fetchData:", error);
    });
  }, [url]);

  return { data, isLoading, isError };
}

// ============================ z uzyciem abort controllera

// export default function useAPI<T>(url: string): UseApiResponse<T> {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   const fetchData = useCallback(
//     async ({ signal }: { signal: AbortSignal }) => {
//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const res = await fetch(url, { signal });

//         if (!res.ok) {
//           throw new Error(`Network response was not ok. Status: ${res.status}`);
//         }

//         const result = (await res.json()) as T;
//         setData(result);
//       } catch (error) {
//         if (!signal.aborted) {
//           setIsError(true);
//           console.error("Error during fetch:", error);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [url]
//   );

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     fetchData({ signal }).catch((error) => {
//       console.error("Error during fetchData:", error);
//     });

//     return () => {
//       abortController.abort();
//     };
//   }, [fetchData]);

//   return { data, isLoading, isError };
// }

// ============================ to było po callu

// import { useState, useEffect } from "react";

// type UseApiResponse<T>={
//   data: null;
//   isLoading: true;
//   isError: false;
// }|{
//   data: null;
//   isLoading: false;
//   isError: true;
// }|{
//   data: T | null;
//   isLoading: false;
//   isError: false;
// }

// export default function useAPI<T>(url: string) {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   //  eslint-disable-next-line
//   const fetchPosts = async ({ signal }: { signal: AbortSignal }) => {
//     setIsLoading(true);
//     setIsError(false);
//     const res = await fetch(url, { signal });
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = (await res.json()) as T;
//     return data;
//   };

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     fetchPosts({ signal })
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         setIsError(true);
//         console.error(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });

//     return () => {
//       abortController.abort();
//     };
//   }, [url, fetchPosts]);

//   return { data, isLoading, isError };
// }

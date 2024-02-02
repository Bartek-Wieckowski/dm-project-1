import { RANDOM_IMG_URL } from "../constants/appConst";
import { useUser } from "../contexts/useUser";
export default function Avatar() {
  const {
    userData: { user },
  } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <img
        className="size-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
        src={user?.avatar ? user.avatar : RANDOM_IMG_URL}
        alt="Bordered avatar"
      />
      <small className="text-slate-900 dark:text-stone-200">{user?.username}</small>
    </div>
  );
}

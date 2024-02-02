import Login from "../components/Login/Login";
import { useUser } from "../contexts/useUser";

export default function Homepage() {
  const {
    userData: { isAuth, user },
  } = useUser();
  return (
    <>
      {!isAuth && <Login />}
      {isAuth && (
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-center text-5xl text-slate-900 dark:text-stone-200">Witaj {user?.username}</h1>
        </div>
      )}
    </>
  );
}

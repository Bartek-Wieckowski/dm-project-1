import Login from "../components/Login/Login";
import { useUser } from "../contexts/UserContext";

export default function Homepage() {
  const {
    userData: { isAuth, user },
  } = useUser();
  return (
    <>
      {!isAuth && <Login />}
      {isAuth && (
        <div className="flex items-center gap-4 justify-center">
          <h1 className="text-slate-900 dark:text-stone-200 text-center text-5xl">Witaj {user?.username}</h1>
        </div>
      )}
    </>
  );
}

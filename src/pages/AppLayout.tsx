import { Outlet } from "react-router";
import { footerData } from "../assets/dummy-data/footer-data";
import { BsBoxArrowRight } from "react-icons/bs";
import AsideMenu from "../components/AsideMenu";
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";
import Avatar from "../components/Avatar";
import { useUser } from "../contexts/useUser";

export default function AppLayout() {
  const {
    userData: { isAuth },
    logOut,
  } = useUser();
  return (
    <>
      {isAuth && (
        <div className="relative">
          <div className="absolute right-2 top-4 flex items-center gap-4">
            <Avatar />
            <button onClick={() => logOut()} className="text-slate-900 dark:text-stone-200">
              <BsBoxArrowRight />
            </button>
          </div>
        </div>
      )}
      <main className="grid min-h-screen grid-cols-[100px_1fr] place-items-center bg-stone-200 dark:bg-slate-900">
        <AsideMenu />
        <div className="w-full px-2 py-4">
          <Outlet />
        </div>
        <div className="col-start-2 w-full self-end text-center">
          <Wrapper>
            <Footer footerData={footerData} />
          </Wrapper>
        </div>
      </main>
    </>
  );
}

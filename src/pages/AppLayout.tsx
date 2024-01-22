import { Outlet } from 'react-router';
import { footerData } from '../assets/dummy-data/footer-data';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper';

export default function AppLayout() {
  return (
    <main className="grid min-h-screen grid-cols-[100px_1fr] place-items-center bg-slate-900">
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
  );
}

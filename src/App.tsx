import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Postspage from './pages/Postspage';
import Commentspage from './pages/Commentspage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="comments" element={<Commentspage />}></Route>
          <Route path="posts" element={<Postspage />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

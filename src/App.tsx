import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Postspage from './pages/Postspage';
import Commentspage from './pages/Commentspage';
import NotFound from './pages/NotFound';
import Example from './pages/Example';
import Example2 from './pages/Example2';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="comments" element={<Commentspage />}></Route>
          <Route path="posts" element={<Postspage />}></Route>
          <Route path="modals-example" element={<Example />}></Route>
          <Route path="table-example" element={<Example2 />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

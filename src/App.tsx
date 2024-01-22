import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Postspage from "./pages/Postspage";
import Commentspage from "./pages/Commentspage";
import NotFound from "./pages/NotFound";
import Example from "./pages/Example";
import Example2 from "./pages/Example2";
import Cart from "./pages/Cart";
import ClientAdd from "./components/Clients/ClientAdd";
import Client from "./components/Clients/Client";
import ClientEdit from "./components/Clients/ClientEdit";
import Clientspage from "./pages/Clientspage";
import Orderspage from "./pages/Orderspage";
import Order from "./components/Orders/Order";
import OrderAdd from "./components/Orders/OrderAdd";
import Invoicespage from "./pages/Invoicespage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="clients" element={<Clientspage />} />
          <Route path="clients/add" element={<ClientAdd />} />
          <Route path="clients/:id" element={<Client />} />
          <Route path="clients/:id/edit" element={<ClientEdit />} />

          <Route path="orders" element={<Orderspage />} />
          <Route path="orders/:id" element={<Order />} />
          <Route path="orders/add" element={<OrderAdd />} />

          <Route path="invoices" element={<Invoicespage />} />

          <Route path="comments" element={<Commentspage />} />
          <Route path="posts" element={<Postspage />} />
          <Route path="modals-example" element={<Example />} />
          <Route path="table-example" element={<Example2 />} />
          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

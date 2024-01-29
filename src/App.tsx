import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Postspage from "./pages/Postspage";
import Commentspage from "./pages/Commentspage";
import NotFound from "./pages/NotFound";
import Example from "./pages/Example";
import Example2 from "./pages/Example2";
import Cart from "./pages/Cart";
import ClientAdd from "./components/Clients/ClientAdd";
import ClientDetails from "./components/Clients/ClientDetails";
import ClientEdit from "./components/Clients/ClientEdit";
import Clientspage from "./pages/Clientspage";
import Orderspage from "./pages/Orderspage";
import OrderDetails from "./components/Orders/OrderDetails";
import OrderAdd from "./components/Orders/OrderAdd";
import Invoicespage from "./pages/Invoicespage";
import Registerpage from "./pages/Registerpage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/clients",
        element: <Clientspage />,
      },
      {
        path: "/clients/add",
        element: <ClientAdd />,
      },
      {
        path: "/clients/:id",
        element: <ClientDetails />,
      },
      {
        path: "/clients/:id/edit",
        element: <ClientEdit />,
      },
      {
        path: "/orders",
        element: <Orderspage />,
      },
      {
        path: "/orders/add",
        element: <OrderAdd />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "/invoices",
        element: <Invoicespage />,
      },
      {
        path: "/comments",
        element: <Commentspage />,
      },
      {
        path: "/posts",
        element: <Postspage />,
      },
      {
        path: "/modals-example",
        element: <Example />,
      },
      {
        path: "/table-examplee",
        element: <Example2 />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/register",
        element: <Registerpage />,
      },
    ],
  },
]);
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      gcTime: 60_000,
      // staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE === "development" && <ReactQueryDevtools initialIsOpen={false} />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

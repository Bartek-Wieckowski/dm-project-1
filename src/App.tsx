import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter, useRouteError } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./contexts/UserContext";

import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import ProtectedWrapper from "./components/ProtectedWrapper";
import Loader from "./components/Loader";
import { NotificationProvider } from "./contexts/NotificationContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const Homepage = lazy(() => import("./pages/Homepage"));
const Postspage = lazy(() => import("./pages/Postspage"));
const Commentspage = lazy(() => import("./pages/Commentspage"));
const Example = lazy(() => import("./pages/Example"));
const Example2 = lazy(() => import("./pages/Example2"));
const Cart = lazy(() => import("./pages/Cart"));
const ClientAdd = lazy(() => import("./components/Clients/ClientAdd"));
const ClientDetails = lazy(() => import("./components/Clients/ClientDetails"));
const ClientEdit = lazy(() => import("./components/Clients/ClientEdit"));
const Clientspage = lazy(() => import("./pages/Clientspage"));
const Orderspage = lazy(() => import("./pages/Orderspage"));
const OrderDetails = lazy(() => import("./components/Orders/OrderDetails"));
const OrderAdd = lazy(() => import("./components/Orders/OrderAdd"));
const Invoicespage = lazy(() => import("./pages/Invoicespage"));
const Registerpage = lazy(() => import("./pages/Registerpage"));

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>Boom!</div>;
}

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/clients",
        element: (
          <Suspense fallback={<Loader />}>
            <Clientspage />
          </Suspense>
        ),
      },
      {
        path: "/clients/add",
        element: (
          <Suspense fallback={<Loader />}>
            <ClientAdd />
          </Suspense>
        ),
      },
      {
        path: "/clients/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ClientDetails />
          </Suspense>
        ),
      },
      {
        path: "/clients/:id/edit",
        element: (
          <Suspense fallback={<Loader />}>
            <ClientEdit />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loader />}>
            <Orderspage />
          </Suspense>
        ),
      },
      {
        path: "/orders/add",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderAdd />
          </Suspense>
        ),
      },
      {
        path: "/orders/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderDetails />
          </Suspense>
        ),
      },
      {
        path: "/invoices",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedWrapper>
              <Invoicespage />
            </ProtectedWrapper>
          </Suspense>
        ),
      },
      {
        path: "/comments",
        element: (
          <Suspense fallback={<Loader />}>
            <Commentspage />
          </Suspense>
        ),
      },
      {
        path: "/posts",
        element: (
          <Suspense fallback={<Loader />}>
            <Postspage />
          </Suspense>
        ),
      },
      {
        path: "/modals-example",
        element: (
          <Suspense fallback={<Loader />}>
            <Example />
          </Suspense>
        ),
      },
      {
        path: "/table-examplee",
        element: (
          <Suspense fallback={<Loader />}>
            <Example2 />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Registerpage />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      gcTime: 60_000,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.MODE === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        <NotificationProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

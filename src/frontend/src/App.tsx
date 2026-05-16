import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { Contact } from "@/pages/Contact";
import { Films } from "@/pages/Films";
import { Gallery } from "@/pages/Gallery";
import { Home } from "@/pages/Home";
import { Packages } from "@/pages/Packages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Apply dark class to html root
if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const rootRoute = createRootRoute({ component: Outlet });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const filmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/films",
  component: Films,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});
const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: Packages,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  filmsRoute,
  galleryRoute,
  packagesRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

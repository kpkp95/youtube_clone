import Header from "./components/Header";
import React, { lazy, Suspense } from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import ErrorBoundary from "./components/ErrorBoundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";

// Lazy load components
const MainContainer = lazy(() => import("./components/MainContainer"));
const WatchPage = lazy(() => import("./components/WatchPage"));
const SearchResults = lazy(() => import("./components/SearchResults"));

// Layout Component
const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <Header />
      <Body />
    </div>
  );
};

// Layout Component
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path: "results", element: <SearchResults /> },
    ],
  },
]);

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={appRouter} />
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

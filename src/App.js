import Header from "./components/Header";
import Head from "./components/Head";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout Component
const AppLayout = () => {
  return (
    <div>
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
      {
        path: "/",
        element: <MainContainer />, // Default child route
      },
      {
        path: "watch",
        element: <WatchPage />, // Route for watch page
      },
      { path: "results", element: <SearchResults /> },
    ],
  },
]);

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Nav from "./components/Nav.jsx";
import UserPage from "./pages/UserPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Landing from "./pages/LandingPage.jsx";

function Router() {
  const routes = [
    { path: "/", component: <Landing /> },
    { path: "/home", component: <HomePage /> },
    { path: "/contact", component: <ContactPage /> },
    { path: "/user/:userId", component: <UserPage /> },
    { path: "/profile/:profileId", component: <ProfilePage /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Nav />}>
          {routes.map((route, index) => {
            <Route key={index} path={route.path} element={route.component} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

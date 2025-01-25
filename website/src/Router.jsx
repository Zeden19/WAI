import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage.jsx";
import Contact from "@/pages/Contact.jsx";
import Nav from "@/components/Nav.jsx";

function Router() {
    const routes = [{ path: "/", component: <HomePage /> },
        { path: "/contact", component: <Contact /> }];
    return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Nav />}>
                  {routes.map((route, index) => <Route key={index} index path={route.path}
                                                       element={route.component} />)}
              </Route>
          </Routes>
      </BrowserRouter>
    );
}

export default Router;
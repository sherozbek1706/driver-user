import { Routes as Router, Route } from "react-router-dom";
import { Home, Login } from "../../pages";
// import { Login } from "../../pages";
// import Home from "../../pages/home/home";
import { Private, Protect } from "../../auth";

export const Routers = () => {
  return (
    <Router>
      <Route
        path="/"
        element={
          <Protect>
            <Home />
          </Protect>
        }
      />
      <Route
        path="/login"
        element={
          <Private>
            <Login />
          </Private>
        }
      />
    </Router>
  );
};

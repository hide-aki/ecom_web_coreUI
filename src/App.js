import React from "react";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { login } from "./actions";
import "./scss/style.scss";

const loading = (
  <div
    className="c-app c-default-layout justify-content-center flex-row align-items-center"
    role="status">
    <div className="spinner-grow">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./components/login/Login"));
const Register = React.lazy(() => import("./components/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  // const dispatch = useDispatch();
  // const autoLogin = () => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   if (loggedInUser) {
  //     dispatch(login(loggedInUser));
  //   }
  // };

  // useEffect(autoLogin, []);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;

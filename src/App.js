import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./styles.css";
import "./css/seats.css";
import { routes } from "./Routes/routes";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import image1 from "./Images/banner.jpg";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { userContext } from "./Context/Context";
import networkRequests from "./Utils/networkRequests";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

const App = () => {
  const location = useLocation();
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace(routes.home);
    }

    networkRequests("/user/isLoggedIn")
      .then(response => {
        if (response.loggedInStatus) {
          console.log("Inside the /user/isLoggedIn page then loop" + response);
          console.log("isloggedin value is   :   " + isLoggedIn);
          setIsLoggedIn(true);
          console.log("isloggedin value is after change  :   " + isLoggedIn);
          // user.validUser = true;
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.log("isloggedin catch part" + error);
        setIsLoggedIn(false);
        // user.validUser = false;
      });
  }, []);

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App bg-img" style={{ backgroundImage: `url(${image1})` }}>
        <NavBar />
        <div className="container-fluid p-0">
          <Switch>
            <Route path={routes.home}>
              <Home />
            </Route>
            <Route path={routes.login}>
              <LoginPage />
            </Route>
            <Route path={routes.signUp}>
              <SignupPage />
            </Route>
            <Route path={routes.signUpVerify}>
              <VerifyEmailPage />
            </Route>
            <Route path={routes.forgotPassword}>
              <ForgotPasswordPage />
            </Route>
            <Route path={routes.resetPassword}>
              <ResetPasswordPage />
            </Route>
          </Switch>
        </div>
        {/* <DisplaySeats /> */}
      </div>
    </userContext.Provider>
  );
};

export default App;

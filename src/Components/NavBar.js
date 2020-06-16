import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { routes } from "../Routes/routes";
import { userContext } from "../Context/Context";
const NavBar = () => {
  const history = useHistory();
  const user = useContext(userContext);

  const logout = event => {
    event.preventDefault();
    console.log("logout function");
    user.setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");
    history.push(routes.home);
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="nav-heading text-white">
          <h4>
            <Link className="text-white no-underline" to={routes.home}>
              Bus Reservation system
            </Link>
          </h4>
        </div>

        {user.isLoggedIn ? (
          <div className="navbar-nav justify-content-end">
            <div className="nav-item ">
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-nav justify-content-end">
            <div className="nav-item mr-8">
              <button
                className="btn btn-primary"
                onClick={() => history.push(routes.login)}
              >
                Login
              </button>
            </div>
            <div className="nav-item ">
              <button
                className="btn btn-primary"
                onClick={() => history.push(routes.signUp)}
              >
                SignUp
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

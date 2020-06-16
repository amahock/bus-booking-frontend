import React, { useState, useEffect } from "react";
import { NavLink } from "reactstrap";
import { useParams } from "react-router-dom";
import { routes } from "../Routes/routes";
import networkRequests from "../Utils/networkRequests";
import FormLayout from "../Components/FormLayout";

const ResetPasswordPage = props => {
  const { token } = useParams();
  console.log(token);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorInPasswordReset, setErrorInPasswordReset] = useState(false);

  const loading = {
    margin: "1em",
    fontSize: "24px"
  };

  useEffect(() => {
    // const myData = {
    //   resetPasswordTokenFromReq: token
    // };
    console.log("Inside Useeffect : " + token);
    networkRequests("/reset", "POST", {
      resetPasswordToken: token
    })
      .then(response => {
        // console.log(response.message);
        if (response.message === "password reset link a-ok") {
          console.log(response.username);
          setUserName(response.username);
          setUpdated(false);
          setIsLoading(false);
          setErrorInPasswordReset(false);
        } else {
          setUpdated(false);
          setIsLoading(false);
          setErrorInPasswordReset(true);
        }
      })
      .catch(err => {
        console.log(err);
        setUpdated(false);
        setIsLoading(false);
        setErrorInPasswordReset(true);
      });
  }, []);

  const updatePassword = event => {
    setPassword(event.target.value);
  };
  const updateConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };

  const resetPasswordViaEmail = event => {
    event.preventDefault();
    if (password === confirmPassword) {
      setIsPasswordMatch(true);
      networkRequests(routes.updatePasswordViaEmail, "PUT", {
        username,
        password,
        resetPasswordToken: token
      })
        .then(response => {
          // console.log(
          //   "in updatePasswordViaEmail route response : " + response.message
          // );
          if (response.message === "password updated") {
            setUpdated(true);
            setErrorInPasswordReset(false);
          } else {
            setUpdated(false);
            setErrorInPasswordReset(true);
          }
        })
        .catch(err => {
          console.log(err.message);
          console.log("error occured in updating the password");
          setUpdated(false);
          setErrorInPasswordReset(true);
        });
    } else {
      setIsPasswordMatch(false);
    }
  };

  const formContent = [
    <div key="formContent-resetPassword">
      <form className="form-signin" onSubmit={resetPasswordViaEmail}>
        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={updatePassword}
            required
          />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="form-label-group">
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  ];

  if (errorInPasswordReset) {
    return (
      <div>
        <div style={loading}>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <NavLink href={routes.home}>Go Home</NavLink>
          <NavLink href={routes.forgotPassword}>Forgot Password?</NavLink>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <div style={loading}>Loading User Data...</div>
      </div>
    );
  }
  return (
    <div>
      <FormLayout heading="Password Reset" formContent={formContent} />
      {!isPasswordMatch ? (
        <div>
          <h3 className="errorMsg">
            Passwords are not matched. Please reenter the passwords.
          </h3>
        </div>
      ) : null}

      {updated && (
        <div>
          <p>
            Your password has been successfully reset, please try logging in
            again.
          </p>
          <NavLink href={routes.login}>Login</NavLink>
        </div>
      )}
      <NavLink href={routes.home}>Go Home</NavLink>
    </div>
  );
};

export default ResetPasswordPage;
